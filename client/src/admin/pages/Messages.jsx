import { useEffect, useMemo, useState } from 'react'
import {
  FiCheckCircle,
  FiEye,
  FiInbox,
  FiMail,
  FiMessageCircle,
  FiRefreshCcw,
  FiSearch,
  FiTrash2,
  FiX,
} from 'react-icons/fi'
import { adminMessageService } from '../../services/adminMessageService'
import { useToast } from '../../context/ToastContext'
import { useConfirm } from '../../context/ConfirmContext'

const statusClass = {
  unread: 'bg-blue-50 text-primary',
  read: 'bg-yellow-50 text-yellow-700',
  replied: 'bg-green-50 text-green-700',
}

const statusOptions = ['All', 'unread', 'read', 'replied']

const formatDate = (date) => {
  if (!date) return 'N/A'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))
}

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [activeStatus, setActiveStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState('')
  const { showToast } = useToast()
  const { confirm } = useConfirm()

  const loadMessages = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await adminMessageService.getMessages()
      setMessages(data)
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to load messages. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const stats = useMemo(() => {
    return {
      total: messages.length,
      unread: messages.filter((message) => message.status === 'unread').length,
      read: messages.filter((message) => message.status === 'read').length,
      replied: messages.filter((message) => message.status === 'replied').length,
    }
  }, [messages])

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesStatus =
        activeStatus === 'All' || message.status === activeStatus

      const searchValue = searchTerm.toLowerCase()

      const matchesSearch =
        message.name?.toLowerCase().includes(searchValue) ||
        message.email?.toLowerCase().includes(searchValue) ||
        message.subject?.toLowerCase().includes(searchValue) ||
        message.message?.toLowerCase().includes(searchValue)

      return matchesStatus && matchesSearch
    })
  }, [messages, activeStatus, searchTerm])

  const handleViewMessage = async (message) => {
    try {
      setDetailLoading(true)
      setError('')

      const data = await adminMessageService.getMessageById(message._id)
      setSelectedMessage(data)
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to load message details. Please try again.'
      )
    } finally {
      setDetailLoading(false)
    }
  }

  const handleUpdateStatus = async (message, status) => {
    try {
      setActionLoading(message._id)

      const response = await adminMessageService.updateStatus(message._id, status)

      setMessages((prev) =>
        prev.map((item) =>
          item._id === message._id ? response.data : item
        )
      )

      setSelectedMessage(response.data)

      showToast({
        type: 'success',
        message:
          status === 'read'
            ? 'Message marked as read.'
            : 'Message marked as replied.',
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to update message status. Please try again.'
      )
    } finally {
      setActionLoading('')
    }
  }

  const handleDeleteMessage = async (message) => {
    confirm({
      title: 'Delete Message?',
      message: `Are you sure you want to delete message from "${message.name}"? This message will be removed from MongoDB.`,
      confirmText: 'Delete Message',
      danger: true,
      onConfirm: async () => {
        try {
          setActionLoading(message._id)

          await adminMessageService.deleteMessage(message._id)

          setMessages((prev) => prev.filter((item) => item._id !== message._id))

          if (selectedMessage?._id === message._id) {
            setSelectedMessage(null)
          }

          showToast({
            type: 'success',
            message: 'Message deleted successfully.',
          })
        } catch (error) {
          setError(
            error.response?.data?.message ||
            'Unable to delete message. Please try again.'
          )

          showToast({
            type: 'error',
            message: 'Unable to delete message.',
          })
        } finally {
          setActionLoading('')
        }
      },
    })
  }

  const StatBox = ({ title, value, icon: Icon }) => (
    <div className="card-soft p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-dark">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary">
          <Icon size={22} />
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold text-primary">Messages Manager</p>

          <h1 className="text-3xl font-black text-dark">Contact Messages</h1>

          <p className="mt-2 text-muted">
            View contact form submissions, update message status, and delete old messages.
          </p>
        </div>

        <button
          type="button"
          onClick={loadMessages}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-soft disabled:opacity-60"
        >
          <FiRefreshCcw className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatBox title="Total Messages" value={stats.total} icon={FiInbox} />
        <StatBox title="Unread" value={stats.unread} icon={FiMail} />
        <StatBox title="Read" value={stats.read} icon={FiEye} />
        <StatBox title="Replied" value={stats.replied} icon={FiCheckCircle} />
      </div>

      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, subject, or message..."
            className="w-full rounded-2xl border border-border bg-white px-4 py-4 pl-12 text-sm text-dark outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="flex flex-wrap gap-3 rounded-3xl border border-border bg-white p-3 shadow-sm">
          {statusOptions.map((status) => {
            const isActive = activeStatus === status

            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                className={`rounded-2xl px-5 py-3 text-sm font-bold capitalize transition ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
                  : 'text-muted hover:bg-soft hover:text-primary'
                  }`}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      <div className="card-soft overflow-hidden">
        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-2xl bg-soft" />
            ))}
          </div>
        ) : filteredMessages.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className="grid gap-5 p-6 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                    <FiMessageCircle size={24} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-dark">
                        {message.subject}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass[message.status] || statusClass.unread
                          }`}
                      >
                        {message.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-primary">
                      {message.name} • {message.email}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                      {message.message}
                    </p>

                    <p className="mt-3 text-xs font-semibold text-muted">
                      Received: {formatDate(message.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => handleViewMessage(message)}
                    disabled={detailLoading}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary disabled:opacity-60"
                  >
                    <FiEye />
                    View
                  </button>

                  {message.status !== 'read' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(message, 'read')}
                      disabled={actionLoading === message._id}
                      className="inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-700 transition hover:bg-yellow-600 hover:text-white disabled:opacity-60"
                    >
                      Mark Read
                    </button>
                  )}

                  {message.status !== 'replied' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(message, 'replied')}
                      disabled={actionLoading === message._id}
                      className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 transition hover:bg-green-600 hover:text-white disabled:opacity-60"
                    >
                      Replied
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteMessage(message)}
                    disabled={actionLoading === message._id}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FiMail className="mx-auto text-primary" size={44} />

            <h2 className="mt-5 text-2xl font-black text-dark">
              No messages found
            </h2>

            <p className="mt-2 text-muted">
              Contact form messages will appear here after visitors submit the form.
            </p>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold text-primary">
                  Message Details
                </p>

                <h2 className="text-2xl font-black text-dark">
                  {selectedMessage.subject}
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Received: {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <FiX />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Sender Name
                </p>

                <p className="mt-2 font-black text-dark">
                  {selectedMessage.name}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Sender Email
                </p>

                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="mt-2 block break-words font-black text-primary"
                >
                  {selectedMessage.email}
                </a>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-soft p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Status
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-4 py-2 text-xs font-bold capitalize ${statusClass[selectedMessage.status] || statusClass.unread
                  }`}
              >
                {selectedMessage.status}
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Message
              </p>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-dark">
                {selectedMessage.message}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {selectedMessage.status !== 'read' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedMessage, 'read')}
                  disabled={actionLoading === selectedMessage._id}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-50 px-5 py-3 text-sm font-bold text-yellow-700 transition hover:bg-yellow-600 hover:text-white disabled:opacity-60"
                >
                  <FiEye />
                  Mark as Read
                </button>
              )}

              {selectedMessage.status !== 'replied' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedMessage, 'replied')}
                  disabled={actionLoading === selectedMessage._id}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-50 px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-green-600 hover:text-white disabled:opacity-60"
                >
                  <FiCheckCircle />
                  Mark as Replied
                </button>
              )}

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark"
              >
                <FiMail />
                Reply by Email
              </a>

              <button
                type="button"
                onClick={() => handleDeleteMessage(selectedMessage)}
                disabled={actionLoading === selectedMessage._id}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages