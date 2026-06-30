import Modal from '../../ui/Modal/Modal'

function ParticipantsModal({ isOpen, onClose, event, participants, onKick }) {
  if (!event) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Peserta — ${event.title}`}>
      <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {participants.length === 0 ? (
          <p className="py-8 text-center text-softText">Belum ada peserta yang mendaftar.</p>
        ) : participants.map((reg) => (
          <div
            key={reg.id}
            className="flex items-center justify-between rounded-2xl border border-borderSoft bg-background px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primarySoft font-bold text-primary">
                {reg.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-dark">{reg.name}</p>
                <p className="text-xs text-secondaryText">{reg.email}</p>
              </div>
            </div>
            <button
              onClick={() => onKick(reg)}
              className="rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
            >
              Keluarkan
            </button>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ParticipantsModal
