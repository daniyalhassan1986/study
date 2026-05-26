import React, { useEffect, useRef } from 'react'

function NotFound() {

  const overlayRef = useRef(null)

  useEffect(() => {

    const handleMouseMove = (e) => {

      const x = e.clientX
      const y = e.clientY

      const pos = `${x}px ${y}px`

      overlayRef.current.style.maskImage =
        `radial-gradient(circle 120px at ${pos}, transparent 0%, black 150px)`

      overlayRef.current.style.webkitMaskImage =
        `radial-gradient(circle 120px at ${pos}, transparent 0%, black 150px)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }

  }, [])

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{
          maskImage:
            "radial-gradient(circle 120px at 50% 50%, transparent 0%, black 150px)",
          WebkitMaskImage:
            "radial-gradient(circle 120px at 50% 50%, transparent 0%, black 150px)"
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <h1 className="text-5xl font-bold">
          Page Not Found
        </h1>
      </div>

    </div>
  )
}

export default NotFound