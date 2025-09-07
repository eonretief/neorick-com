// src/components/ui/CustomDropdown.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export interface DropdownOption {
  value: string
  label: string
  code?: string // For country codes
  disabled?: boolean
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChangeAction: (value: string) => void
  placeholder?: string
  className?: string
  buttonClassName?: string
  dropdownClassName?: string
  error?: boolean
  disabled?: boolean
  formatOption?: "default" | "aligned" // For country codes with aligned formatting
  containerClassName?: string // For the click-outside container
}

export default function CustomDropdown({
                                         options,
                                         value,
                                         onChangeAction,
                                         placeholder = "Select an option",
                                         className = "",
                                         buttonClassName = "",
                                         dropdownClassName = "",
                                         error = false,
                                         disabled = false,
                                         formatOption = "default",
                                         containerClassName = "custom-dropdown-container"
                                       }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`.${containerClassName}`)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, containerClassName])

  // Find the selected option to display its label
  const selectedOption = options.find(option => option.value === value)
  const displayText = selectedOption?.label || placeholder

  const handleOptionClick = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled || disabled) return
    onChangeAction(optionValue)
    setIsOpen(false)
  }

  // Default button styling
  const defaultButtonClass = `
    w-full px-4 py-3 rounded-[6px] border bg-white text-primary-900 text-sm 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
    transition-colors text-left flex items-center justify-between
    ${error ? "border-red-300 bg-red-50" : "border-primary-900/20"}
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
  `

  // Default dropdown styling
  const defaultDropdownClass = `
    absolute top-full left-0 w-full max-h-48 overflow-auto bg-white border border-primary-900/20 
    rounded-[6px] shadow-lg z-50 mt-1
  `

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName} ${className}`}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`${defaultButtonClass} ${buttonClassName}`}
      >
        <span className={`truncate ${!value ? 'text-primary-900/40' : ''}`}>
          {displayText}
        </span>
        <ChevronDownIcon className="h-4 w-4 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className={`${defaultDropdownClass} ${dropdownClassName}`}>
          {options.map((option, index) => (
            <button
              key={`${option.value}-${index}`}
              type="button"
              onClick={() => handleOptionClick(option.value, option.disabled)}
              disabled={option.disabled}
              className={`
                w-full px-3 py-2 text-left text-sm transition-colors
                ${option.disabled
                ? 'text-primary-900/40 cursor-default'
                : `hover:bg-primary-50 ${value === option.value ? 'bg-primary-100 text-primary-900' : 'text-primary-900'} cursor-pointer`
              }
              `}
            >
              {formatOption === "aligned" && option.code ? (
                // Aligned format for country codes
                <div className="flex items-center">
                  <span className="w-12 flex-shrink-0 font-medium text-right">{option.code}</span>
                  <span className="text-primary-900/60 ml-1">-</span>
                  <span className="ml-2">{option.label}</span>
                </div>
              ) : (
                // Default format
                option.label
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}