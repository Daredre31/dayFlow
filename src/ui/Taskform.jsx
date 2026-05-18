import React, { useEffect, useRef, useState } from 'react'
import { useTaskContext } from '../context/Taskcontroller';
import { CATEGORIES, PRIORITIES } from "../Mockdata/datas";
import Button from './Button';

const CATEGORY_COLORS = {
  work:     { bg: 'bg-accent/20',  border: 'border-accent',  text: 'text-accent'  },
  study:    { bg: 'bg-amber/20',   border: 'border-amber',   text: 'text-amber'   },
  health:   { bg: 'bg-green/20',   border: 'border-green',   text: 'text-green'   },
  personal: { bg: 'bg-accent2/20', border: 'border-accent2', text: 'text-accent2' },
};

const PRIORITY_CONFIG = {
  high:   { color: 'text-red',    border: 'border-red',    activeBg: 'bg-red/20',    icon: '↑↑' },
  medium: { color: 'text-amber',  border: 'border-amber',  activeBg: 'bg-amber/20',  icon: '↑'  },
  low:    { color: 'text-green',  border: 'border-green',  activeBg: 'bg-green/20',  icon: '—'  },
};

const MAX_TITLE = 200;

const Taskform = ({ closeForm }) => {
  const { addTask } = useTaskContext();

  const [title,    setTitle]    = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [duedate,  setDuedate]  = useState('');
  const [dueTime,  setDueTime]  = useState('');
  const [note,     setNote]     = useState('');
  const [errors,   setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  const titleRef = useRef();

  useEffect(() => { titleRef.current?.focus(); }, []);

  // live re-validate a field once user has submitted once
  const validate = (fields = { title, category, priority, duedate }) => {
    const e = {};
    if (!fields.title.trim())           e.title    = 'Task title is required.';
    else if (fields.title.trim().length < 3) e.title = 'Title must be at least 3 characters.';
    if (!fields.category)               e.category = 'Pick a category.';
    if (!fields.priority)               e.priority = 'Pick a priority level.';
    if (!fields.duedate)                e.duedate  = 'Due date is required.';
    return e;
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length > MAX_TITLE) return;
    setTitle(val);
    if (submitted) setErrors(prev => ({ ...prev, ...validate({ title: val, category, priority, duedate }) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate({ title, category, priority, duedate });
    if (Object.keys(errs).length) { setErrors(errs); return; }

    addTask({ title: title.trim(), category, priority, duedate, dueTime, note });
    closeForm();
  };

  const titleCount = title.trim().length;
  const nearLimit  = titleCount > MAX_TITLE * 0.85;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm'>
      <div className='bg-surface2 border border-border md:w-[420px] w-[320px] rounded-xl shadow-xl'>

        {/* ── Header ─────────────────────────────────────── */}
        <div className='flex justify-between items-center px-4 py-3 border-b border-border'>
          <span className='text-text font-semibold text-sm'>Add new task</span>
          <button
            onClick={closeForm}
            className='w-6 h-6 flex items-center justify-center rounded
                       text-secondary hover:text-text hover:bg-surface3
                       transition-colors duration-150 text-sm font-bold'
          >✕</button>
        </div>

        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4' noValidate>

          {/* ── Title ──────────────────────────────────────── */}
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <label className='text-secondary text-xs font-medium'>
                Task title <span className='text-red'>*</span>
              </label>
              <span className={`text-xs font-mono ${nearLimit ? 'text-amber' : 'text-tertiary'}`}>
                {titleCount}/{MAX_TITLE}
              </span>
            </div>
            <input
              ref={titleRef}
              type='text'
              value={title}
              onChange={handleTitleChange}
              placeholder='e.g. Review pull request...'
              className={`
                w-full bg-surface3 border rounded-md py-2 px-3
                text-text text-sm placeholder:text-tertiary
                focus:outline-none focus:border-accent
                transition-colors duration-150
                ${errors.title ? 'border-red' : 'border-border'}
              `}
            />
            {errors.title && (
              <span className='text-red text-xs flex items-center gap-1'>
                <span>⚠</span> {errors.title}
              </span>
            )}
          </div>

          {/* ── Category ───────────────────────────────────── */}
          <div className='flex flex-col gap-2'>
            <label className='text-secondary text-xs font-medium'>
              Category <span className='text-red'>*</span>
            </label>
            <div className='flex flex-wrap gap-2'>
              {CATEGORIES.map(cat => {
                const cfg     = CATEGORY_COLORS[cat.toLowerCase()] ?? {};
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type='button'
                    onClick={() => {
                      setCategory(cat);
                      if (submitted) setErrors(prev => ({ ...prev, ...validate({ title, category: cat, priority, duedate }) }));
                    }}
                    className={`
                      px-3 py-1.5 rounded-lg border text-xs font-semibold
                      transition-all duration-150 active:scale-95
                      ${isActive
                        ? `${cfg.bg ?? 'bg-accent/20'} ${cfg.border ?? 'border-accent'} ${cfg.text ?? 'text-accent'}`
                        : 'border-border text-secondary hover:border-accent hover:text-text bg-surface3'
                      }
                    `}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <span className='text-red text-xs flex items-center gap-1'>
                <span>⚠</span> {errors.category}
              </span>
            )}
          </div>

          {/* ── Priority ───────────────────────────────────── */}
          <div className='flex flex-col gap-2'>
            <label className='text-secondary text-xs font-medium'>
              Priority <span className='text-red'>*</span>
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {PRIORITIES.map(pr => {
                const cfg     = PRIORITY_CONFIG[pr.toLowerCase()] ?? {};
                const isActive = priority === pr;
                return (
                  <button
                    key={pr}
                    type='button'
                    onClick={() => {
                      setPriority(pr);
                      if (submitted) setErrors(prev => ({ ...prev, ...validate({ title, category, priority: pr, duedate }) }));
                    }}
                    className={`
                      flex flex-col items-center justify-center
                      py-3 rounded-lg border text-xs font-semibold gap-1
                      transition-all duration-150 active:scale-95
                      ${isActive
                        ? `${cfg.activeBg} ${cfg.border} ${cfg.color}`
                        : 'border-border text-secondary bg-surface3 hover:border-secondary'
                      }
                    `}
                  >
                    <span className='text-base leading-none'>{cfg.icon}</span>
                    <span className='capitalize'>{pr}</span>
                  </button>
                );
              })}
            </div>
            {errors.priority && (
              <span className='text-red text-xs flex items-center gap-1'>
                <span>⚠</span> {errors.priority}
              </span>
            )}
          </div>

          {/* ── Date + Time ────────────────────────────────── */}
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-secondary text-xs font-medium'>
                Due date <span className='text-red'>*</span>
              </label>
              <input
                type='date'
                value={duedate}
                onChange={e => {
                  setDuedate(e.target.value);
                  if (submitted) setErrors(prev => ({ ...prev, ...validate({ title, category, priority, duedate: e.target.value }) }));
                }}
                className={`
                  w-full bg-surface3 border rounded-md py-2 px-3
                  text-text text-sm focus:outline-none focus:border-accent
                  transition-colors duration-150
                  ${errors.duedate ? 'border-red' : 'border-border'}
                `}
              />
              {errors.duedate && (
                <span className='text-red text-xs flex items-center gap-1'>
                  <span>⚠</span> {errors.duedate}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-secondary text-xs font-medium'>Due time</label>
              <input
                type='time'
                value={dueTime}
                onChange={e => setDueTime(e.target.value)}
                className='w-full bg-surface3 border border-border rounded-md py-2 px-3
                           text-text text-sm focus:outline-none focus:border-accent
                           transition-colors duration-150'
              />
            </div>
          </div>

          {/* ── Note ───────────────────────────────────────── */}
          <div className='flex flex-col gap-1'>
            <label className='text-secondary text-xs font-medium'>
              Note <span className='text-tertiary'>(optional)</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder='Any extra details...'
              className='w-full bg-surface3 border border-border rounded-lg
                         py-2 px-3 text-text text-sm placeholder:text-tertiary
                         focus:outline-none focus:border-accent
                         transition-colors duration-150 resize-none'
            />
          </div>

          {/* ── Actions ────────────────────────────────────── */}
          <div className='flex justify-between gap-3 pt-1'>
            <Button bg='bg-surface3' width='w-[40%]' logo='✕' text='Cancel'   onClick={closeForm}     />
            <Button bg='bg-accent'   width='w-[57%]' logo='+' text='Add Task'  onClick={handleSubmit}  />
          </div>

        </form>
      </div>
    </div>
  );
};

export default Taskform;