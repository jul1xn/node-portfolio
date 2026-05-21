'use client'

import { useState } from 'react'

type Props = {
    type: 'email' | 'phone'
    className?: string
    children: React.ReactNode
}

export default function RevealContact({
    type,
    className,
    children
}: Props) {
    const [revealed, setRevealed] = useState(false)

    const email = process.env.NEXT_PUBLIC_EMAIL || ''
    const phone = process.env.NEXT_PUBLIC_PHONE || ''

    const handleClick = () => {
        if (!revealed) {
            setRevealed(true)
            return
        }

        if (type === 'email') {
            window.location.href = `mailto:${email}`
        }

        if (type === 'phone') {
            window.location.href = `tel:${phone}`
        }
    }

    return (
        <button
            onClick={handleClick}
            className={className}
            aria-label={type}
            type="button"
        >
            {revealed ? (
                type === 'email' ? email : phone
            ) : (
                children
            )}
        </button>
    )
}