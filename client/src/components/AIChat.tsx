import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from '@/components/ui/shadcn-io/ai/prompt-input'
import { Message, MessageAvatar, MessageContent } from '@/components/ui/shadcn-io/ai/message'
import { nanoid } from 'nanoid'
import { useState, useEffect, useRef } from 'react'

const AIChat = () => {
  const [messages, setMessages] = useState<
    {
      key: string
      value: string
      from: 'user' | 'assistant'
    }[]
  >([
    {
      key: nanoid(),
      value: 'Hola! Bienvenido al soporte de Este Bancquito, ¿En qué puedo ayudarte hoy?',
      from: 'assistant',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      key: nanoid(),
      value: inputValue,
      from: 'user' as const,
    }

    setMessages(prev => [...prev, userMessage])

    setTimeout(() => {
      const assistantMessage = {
        key: nanoid(),
        value: `Función aún no implementada. Se ha recibido el mensaje: "${inputValue}"`,
        from: 'assistant' as const,
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 500)

    setInputValue('')
  }

  return (
    <section className="flex flex-col h-screen bg-black">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
      <div className="flex flex-col h-full max-w-4xl w-full mx-auto">
        {/* Conversation - scrollable area with fixed height */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4">
            {messages.map(({ key, value, from }) => (
              <Message from={from} key={key} className="mb-4">
                <MessageAvatar src="" name={from === 'user' ? 'User' : 'Assistant'} />
                <MessageContent className="bg-zinc-800 rounded-lg px-4 py-2 text-zinc-100">
                  {value}
                </MessageContent>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input - fixed at bottom */}
        <div className="border-t border-zinc-800 bg-black px-4 py-4">
          <PromptInput className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-full">
            <PromptInputTextarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="px-4 py-3 bg-transparent text-zinc-100"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <PromptInputToolbar className="justify-end border-t border-zinc-800 px-3 py-2">
              <PromptInputSubmit size="lg" onClick={handleSubmit} />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </section>
  )
}

export default AIChat
