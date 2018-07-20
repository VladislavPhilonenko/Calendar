const sortTasksByStart = tasks => tasks.sort((a, b) => a.start - b.start);

const compareCrossing = (task, taskGroup) => taskGroup.filter(item => (
  task.start <= item.start &&
  (task.start + task.duration) >= item.start ||
  task.start >= item.start &&
  (item.start + item.duration) >= task.start
));

const groupCrossedTasks = tasks => {
  const sortedTasks = sortTasksByStart(tasks);

  return sortedTasks.reduce((obj, task, taskIndex, arr) => {
    obj[`${ taskIndex }-${ task.id }`] = compareCrossing(task, arr);

    return obj;
  }, {});
};

const modifyTasksForGroups = groups => {
  const modifiedTasks = [];
  const maxGroupLength = getMaxGroupLength(groups);
  const width = 100 / maxGroupLength;
  const groupTasks = groups.map(elem =>  elem[1]);
  const allConnectors = [];

  groupTasks.reduce((currItem, nextItem) => {
    if (nextItem) {
      const groupObj = currItem.reduce((obj, elem) => {
        obj[elem.id] = true;
  
        return obj;
      }, {});

      const connectedTasks = nextItem.filter(elem => groupObj[elem.id]);
      const connectedTasksObj = allConnectors.reduce((obj, elem) => {
        obj[elem.id] = true;
  
        return obj;
      }, {});

      connectedTasks.forEach(elem => {
        if (connectedTasksObj[elem.id]) {
          return null;
        }

        allConnectors.push(elem);
      });
    }

    return nextItem;
  });

  const groupObj = allConnectors.reduce((obj, elem) => {
    obj[elem.id] = true;

    return obj;
  }, {});

  allConnectors.reduce((margin, task) => {
    const taskWidth = `${ width }%`;
    const marginLeft = `${ margin }%`;

    modifiedTasks.push({ ...task, width: taskWidth, marginLeft });

    return margin + width;
  }, 0);

  groupTasks.forEach(group => {
    const marginStart = group.reduce((margin, task) => {
      return groupObj[task.id]
        ? margin + width
        : margin;
    }, 0);

    group.reduce((margin, task) => {
      if (groupObj[task.id]) {
        return margin;
      }

      const taskWidth = `${ width }%`;
      const marginLeft = `${ margin }%`;

      modifiedTasks.push({ ...task, width: taskWidth, marginLeft });

      return margin + width;
    }, marginStart);
  });

  return modifiedTasks;
};

const removeDuplicatedGroups = groupedTasksAsArr => {
  const groupedTasksAsArrCopy = [].concat(groupedTasksAsArr);
  const markedTaskGroups = groupedTasksAsArr.reduce((groupedTasksAsArrCopy, group) => {
    const groupId = group[0];
    const groupTasks = group[1];
    const taskIds = groupTasks.reduce((obj, task) => {
      obj[task.id] = true;

      return obj;
    }, {});

    if (groupId === 'undefined') {
      return groupedTasksAsArrCopy;
    }

    return groupedTasksAsArrCopy.map(group => {
      if (group[0] === groupId) {
        return group;
      }

      if (group[1].every(elem => taskIds[elem.id]) && group[1].length === groupTasks.length) {
        group[0] = 'undefined';
      }

      return group;
    });
  }, groupedTasksAsArrCopy)

  return markedTaskGroups.filter(elem => elem[0] !== 'undefined');
};

const getMaxGroupLength = groups => groups.reduce((maxLength, group) => {
    return group[1].length > maxLength
      ? group[1].length
      : maxLength;
  }, 0);

const modifyTasks = tasks => {
  const modifiedTasks = [];
  const groupedTasks = groupCrossedTasks(tasks);
  const groupedTasksAsArr = Object.entries(groupedTasks);
  const groupsWithoutDuplicates = removeDuplicatedGroups(groupedTasksAsArr);
  const state = {
    groups: [],
    connectors: []
  };

  groupsWithoutDuplicates.reduce(({ groups, connectors }, group, i) => {
    const tasks = group[1];

    if (tasks.length === 1 && !groups.length) {
      modifiedTasks.push({ 
        ...tasks[0], 
        width: '100%', 
        marginLeft: '0%' 
      });

      return {
        groups,
        connectors
      };
    }

    if (tasks.length === 1) {
      modifiedTasks.push({ ...tasks[0], width: '100%', marginLeft: '0%' });

      if (!connectors.length) {
        groups[0][1].reduce((margin, element) => {
          const width = `${ 100 / groups[0][1].length }%`;
          const marginLeft = `${ margin }%`;

          modifiedTasks.push({ ...element, width, marginLeft });

          return margin + 100 / groups[0][1].length;
        }, 0);

        return { 
          groups: [], 
          connectors: []
        };
      }

      modifiedTasks.push(...modifyTasksForGroups(groups, modifiedTasks));

      return { 
        groups: [], 
        connectors: []
      };
    }

    if (!groups.length) {
      if (!groupsWithoutDuplicates[i + 1]) {
        groups.push(group);
        modifiedTasks.push(...modifyTasksForGroups(groups, modifiedTasks));

        return {
          groups,
          connectors
        }; 
      }

      groups.push(group);

      return {
        groups,
        connectors
      };
    }

    const prevTasksObj = groupsWithoutDuplicates[i - 1][1].reduce((obj, task) => {
      obj[task.id] = true;

      return obj;
    }, {});

    if (!tasks.some(task => prevTasksObj[task.id])) {
      modifiedTasks.push(...modifyTasksForGroups(groups, modifiedTasks));

      groups = [];
      groups.push(group);

      if (!groupsWithoutDuplicates[i + 1]) {
        modifiedTasks.push(...modifyTasksForGroups(groups, modifiedTasks));
      }
      
      return {
        groups,
        connectors
      };
    }

    if (!groupsWithoutDuplicates[i + 1]) {
      if (tasks.length > groupsWithoutDuplicates[i - 1][1].length) {
        connectors.push(group);
      } else {
        groups.push(group);
      }

      modifiedTasks.push(...modifyTasksForGroups(groups, modifiedTasks));
    }

    if (tasks.length > groupsWithoutDuplicates[i - 1][1].length) {
      connectors.push(group);
    } else {
      groups.push(group);
    }
    
    return {
      groups,
      connectors
    };
  }, state);

  return modifiedTasks;
};

const modifyAMTasks = tasks => tasks.map(task => ({
  ...task, 
  start: task.start * 3,
  duration: task.duration * 3
}));

const modifyPMTasks = tasks => tasks.map(task => ({
  ...task, 
  start: (task.start - 300) * 3,
  duration: task.duration * 3
}));  

export const splitTasks = tasks => {
  const oneOclock = 300;
  const am = tasks.filter(({ start, duration }) => +start + +duration < oneOclock);
  const pm = tasks.filter(({ start }) => +start >= oneOclock);
  const between = tasks.filter(({ start, duration }) => +start < oneOclock && +start + +duration >= oneOclock);

  between.forEach(item => {
    const amDuration = oneOclock - item.start - 1;
    const pmDuration = item.duration - amDuration;

    const amTask = { 
      id: item.id,
      start: item.start,
      duration: amDuration, 
      title: item.title
    };

    const pmTask = pmDuration > 6
      ? ({ 
        id: item.id,
        start: oneOclock,
        duration: pmDuration, 
        title: item.title
      })
      : ({ 
        id: item.id,
        start: oneOclock,
        duration: pmDuration
      })

    pm.push(pmTask);
    am.push(amTask);
  }, []);

  const modifiedAMTasks = modifyAMTasks(am);
  const modifiedPMTasks = modifyPMTasks(pm);

  return {
    am: modifyTasks(modifiedAMTasks),
    pm: modifyTasks(modifiedPMTasks)
  }
};
