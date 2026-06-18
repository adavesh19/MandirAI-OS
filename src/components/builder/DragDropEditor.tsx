'use client'

import React, { useState } from 'react'
import { DndContext, closestCenter, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BuilderBlock, PluginType } from './plugins/types'
import BlockRenderer from './BlockRenderer'
import { GripVertical, Plus, Settings, Trash2 } from 'lucide-react'

// --- SORTABLE ITEM COMPONENT ---
function SortableBlock({ block, onDelete }: { block: BuilderBlock; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group mb-4">
      {/* Block Controls */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button {...attributes} {...listeners} className="p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-sm text-stone-400 hover:text-stone-600 cursor-grab">
          <GripVertical className="h-4 w-4" />
        </button>
        <button onClick={() => onDelete(block.id)} className="p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-sm text-red-400 hover:text-red-600">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Actual Block Content */}
      <div className="border border-transparent hover:border-saffron-500 rounded-xl transition-colors relative">
        {/* Type label */}
        <div className="absolute top-0 right-0 bg-saffron-500 text-white text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-xl font-bold uppercase z-20 opacity-0 group-hover:opacity-100">
          {block.type}
        </div>
        <BlockRenderer block={block} />
      </div>
    </div>
  )
}

// --- MAIN EDITOR COMPONENT ---
export default function DragDropEditor({ initialBlocks = [] }: { initialBlocks?: BuilderBlock[] }) {
  const [blocks, setBlocks] = useState<BuilderBlock[]>(initialBlocks)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const addBlock = (type: PluginType) => {
    const newBlock: BuilderBlock = {
      id: `block-${Date.now()}`,
      type,
      props: getDefaultProps(type)
    }
    setBlocks([...blocks, newBlock])
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id))
  }

  const activeBlock = activeId ? blocks.find(b => b.id === activeId) : null

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* SIDEBAR: Plugin Library */}
      <div className="w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 p-4 overflow-y-auto">
        <h3 className="font-bold text-sm text-stone-500 uppercase mb-4">Plugin Library</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['Hero', 'Hero3D', 'Text', 'Donation', 'Events', 'Store', 'Gallery3D', 'Carousel', 'BentoGrid'] as PluginType[]).map(type => (
            <button
              key={type}
              onClick={() => addBlock(type)}
              className="flex flex-col items-center justify-center p-4 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-saffron-500 hover:text-saffron-600 transition-colors"
            >
              <Plus className="h-5 w-5 mb-2" />
              <span className="text-xs font-medium">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CANVAS: Drag and Drop Area */}
      <div className="flex-1 bg-stone-100 dark:bg-stone-950 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto pl-16">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block) => (
                <SortableBlock key={block.id} block={block} onDelete={deleteBlock} />
              ))}
              
              {blocks.length === 0 && (
                <div className="text-center p-16 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl">
                  <p className="text-stone-500">Drag or click plugins from the sidebar to start building.</p>
                </div>
              )}
            </SortableContext>

            {/* Drag Overlay for smooth visuals */}
            <DragOverlay>
              {activeBlock ? (
                <div className="opacity-80 scale-105 shadow-xl">
                  <BlockRenderer block={activeBlock} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Settings */}
      <div className="w-80 bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 p-6 overflow-y-auto">
         <div className="flex items-center text-stone-500 mb-6">
           <Settings className="h-5 w-5 mr-2" />
           <h3 className="font-bold">Block Settings</h3>
         </div>
         <p className="text-sm text-stone-400">Select a block to edit its properties (Coming soon).</p>
         
         <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800">
            <button className="w-full bg-saffron-600 text-white py-3 rounded-xl font-bold hover:bg-saffron-700">
              Publish Website
            </button>
         </div>
      </div>
    </div>
  )
}

export function getDefaultProps(type: PluginType): Record<string, any> {
  switch (type) {
    case 'Hero': return { title: 'Welcome to the Temple', subtitle: 'Find peace and divinity.', buttonText: 'Donate Now' }
    case 'Hero3D': return { title: 'Divine Presence', subtitle: 'Experience the digital sanctuary.', modelType: 'diya' }
    case 'Text': return { content: '<h2>Our History</h2><p>Founded in 1842, our temple has been...</p>' }
    case 'Donation': return { title: 'Support the Temple', description: 'Your contributions help us maintain the premises and feed the poor.' }
    case 'Events': return { title: 'Upcoming Festivals' }
    case 'Store': return { title: 'Temple Store & Prasad', description: 'Order holy Prasad and merchandise delivered to your home.' }
    case 'Gallery3D': return { title: 'Sacred Moments Gallery' }
    case 'Carousel': return { title: 'Discover Our Temple', subtitle: 'Swipe to explore our spiritual initiatives.' }
    case 'BentoGrid': return { title: 'Quick Access', description: 'Everything you need in one place.' }
    default: return {}
  }
}
