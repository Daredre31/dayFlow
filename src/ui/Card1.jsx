import React, { useState } from 'react'
import { useTaskContext } from '../context/Taskcontroller';

const Card1 = ({ flexW = 'flex-wrap', width = 'w-full', height = 'h-auto', gap = 'gap-4' }) => {
  const { task, deleteTask } = useTaskContext();
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = (taskId) => {
    setCheckedItems(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleDel = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className={`flex ${flexW} ${gap}`}>
      {task.map(item => (
        <div
          key={item.id}
          className={`
            bg-surface2 ${width} ${height}
            px-4 py-3 rounded-lg border border-border
            hover:border-accent transition-all duration-200
            hover:shadow-md
            flex flex-col justify-between
          `}
        >
          {/* Header: Checkbox and Priority */}
          <div className='flex justify-between items-center mb-3'>
            <button
              onClick={() => handleCheck(item.id)}
              className={`
                w-6 h-6 flex items-center justify-center
                rounded-md border-2 transition-all duration-200
                cursor-pointer font-semibold text-sm
                ${checkedItems[item.id]
                  ? 'bg-green border-green text-surface2'
                  : 'border-border bg-surface3 text-text hover:border-green'
                }
              `}
            >
              {checkedItems[item.id] ? '✓' : ''}
            </button>
            <span
              className={`
                text-xs font-semibold px-3 py-1 rounded-md
                ${item.priority === 'high'
                  ? 'bg-red text-surface2'
                  : item.priority === 'medium'
                  ? 'bg-amber text-surface2'
                  : 'bg-green text-surface2'
                }
              `}
            >
              {item.priority}
            </span>
          </div>

          {/* Task Title */}
          <div className='mb-3 flex-grow'>
            <span className={`
              text-sm font-medium text-text
              ${checkedItems[item.id] ? 'line-through opacity-60' : ''}
            `}>
              {item.title}
            </span>
          </div>

          {/* Footer: Category and Delete */}
          <div className='flex justify-between items-center gap-2 pt-2 border-t border-border'>
            <span className='text-xs bg-accent px-3 py-1 rounded-md text-surface2 font-medium'>
              {item.category}
            </span>
            <button
              onClick={() => handleDel(item.id)}
              className={`
                text-xs px-3 py-1 rounded-md font-medium
                bg-red text-surface2
                hover:bg-red/80 transition-colors duration-200
                active:scale-95
              `}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card1;