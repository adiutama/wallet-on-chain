import { Icon } from '@iconify/react'
import { FormEvent, useState } from 'react'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { utils } from 'ethers'
import Modal from '../modal'

type SendButtonProps = {
  symbol?: string,
  max?: number,
  label?: string,
}

export default function SendButton({ symbol, max = Infinity, label = "Send" }: SendButtonProps) {
  const [payload, setPayload] = useState({
    destination: '',
    amount: 0,
  })

  const { config, error } = usePrepareSendTransaction({
    request: {
      to: payload.destination,
      value: utils.parseEther(`${payload.amount}`)
    }
  })

  const { sendTransaction } = useSendTransaction(config)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!error) {
      sendTransaction?.()
    }
  }

  return (
    <>
      <div className="text-center">
        <label htmlFor="send" className="btn btn-circle btn-primary">
          <Icon icon="bx:right-arrow-alt" className="text-xl" />
        </label>
        <div>{label}</div>
      </div>

      <Modal id="send" title='Send' className="w-96" onClose={() => setPayload({ destination: '', amount: 0 })}>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="destination" className="label">Destination</label>
            <input
              type="text"
              id="destination"
              value={payload.destination}
              className="input input-bordered w-full"
              onChange={e => setPayload({ ...payload, destination: e.target.value})}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount" className="label">Amount</label>

            <div className="input-group">
              <input
                type="number"
                id="amount"
                min={0}
                max={max}
                step={0.01}
                value={payload.amount}
                className="input input-bordered w-full"
                onChange={e => setPayload({ ...payload, amount: Number(e.target.value) })}
              />
              {symbol && (
                <span>{symbol}</span>
              )}
            </div>
          </div>

          <div className="mt-10">
            <button className="btn btn-primary btn-block" disabled={error !== null}>Confirm</button>
          </div>

          {error && (
            <div className="alert alert-error mt-6">An error occurred preparing the transaction</div>
          )}
        </form>
      </Modal>
    </>
  )
}