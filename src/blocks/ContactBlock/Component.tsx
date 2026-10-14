'use client'

import React, { useState, useEffect, useRef } from 'react'
import FormProject from '@/FormProject/Component'
import FormChat from '@/FormChat/Component'

declare global {
  interface Window {
    google: any
  }
}

interface Button {
  id: string
  label: string
}

interface ContactBlockProps {
  heading?: string
  subheading?: string
  phone?: string
  phoneHref?: string
  email?: string
  emailHref?: string
  mapUrl?: string
  mapLat?: number
  mapLong?: number
  buttons?: Button[]
  disableInnerContainer?: boolean
}

export const ContactBlock: React.FC<ContactBlockProps> = ({
  heading,
  subheading,
  phone,
  phoneHref,
  email,
  emailHref,
  mapUrl,
  mapLat,
  mapLong,
  buttons = [],
}) => {
  const [openForm, setOpenForm] = useState<'project' | 'chat' | null>(null)
  const [placeData, setPlaceData] = useState<any>(null)

  const handleButtonClick = (id: string) => {
    if (id === 'start-project') setOpenForm('project')
    if (id === 'start-chat') setOpenForm('chat')
  }

  const closeForm = () => setOpenForm(null)

  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapLat == null || mapLong == null) return

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current!, {
        center: { lat: mapLat, lng: mapLong },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        fullscreenControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }],
          },
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })

      new window.google.maps.Marker({
        position: { lat: mapLat, lng: mapLong },
        map,
        icon: {
          url: '/images/the-refinery-icon.png',
          scaledSize: new window.google.maps.Size(50, 71),
        },
      })

      // ✅ OFFSET MAP CENTER DOWN (so overlay doesn't cover marker)
      const offsetCenter = () => {
        const scale = Math.pow(2, map.getZoom())

        const worldCoordinateCenter = map
          .getProjection()
          .fromLatLngToPoint(new window.google.maps.LatLng(mapLat, mapLong))

        const pixelOffsetY = 60 / scale // 👈 tweak this (60–100 recommended)

        const newCenter = new window.google.maps.Point(
          worldCoordinateCenter.x,
          worldCoordinateCenter.y - pixelOffsetY,
        )

        const newLatLng = map.getProjection().fromPointToLatLng(newCenter)

        map.setCenter(newLatLng)
      }

      window.google.maps.event.addListenerOnce(map, 'idle', () => {
        offsetCenter()
      })

      // ✅ Fetch place details using your Place ID
      const service = new window.google.maps.places.PlacesService(map)

      service.getDetails({ placeId: 'ChIJRVQZ5C9o1moRvD4UKZ4plPg' }, (place: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaceData(place)
        }
      })
    }

    if ((window as any).google?.maps) {
      initMap()
      return
    }

    const existingScript = document.getElementById('google-maps-script')

    if (!existingScript) {
      const script = document.createElement('script')
      script.id = 'google-maps-script'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)
    } else if ((window as any).google?.maps) {
      initMap()
    }
  }, [mapLat, mapLong])

  return (
    <div className="max-w-[1200px] mx-auto relative md:flex justify-between pt-6 px-4 pb-16">
      <div className="w-full md:w-[50%] pr-6 flex flex-col max-md:mb-8">
        {heading && <h2 className="mb-2">{heading}</h2>}
        {subheading && <p className="mb-6">{subheading}</p>}

        <div className="mb-6">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleButtonClick(button.id)}
              className="block sm:inline-block mb-4 sm:mr-6 cursor-pointer shadow-lg px-6 py-4 rounded-full text-left"
            >
              {button.label}
              <svg
                className="w-[12px] inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          ))}
        </div>

        {phone && (
          <p className="mt-auto text-2xl font-bold mb-4">
            <a href={phoneHref}>
              <svg
                className="w-[25px] inline-block mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>{' '}
              {phone}
            </a>
          </p>
        )}

        {email && (
          <p className="text-2xl font-bold mb-4">
            <a href={emailHref}>
              <svg
                className="w-[25px] inline-block mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>{' '}
              {email}
            </a>
          </p>
        )}
      </div>

      <div className="w-full md:w-[50%]">
        {mapLat != null && mapLong != null && (
          <div className="relative w-full h-[300px]">
            <div ref={mapRef} className="w-full h-full" />

            {placeData && (
              <div className="absolute top-1 left-1 bg-white/80 backdrop-blur-md shadow-xl p-2 max-w-[calc(100%-0.5rem)] sm:max-w-[320px]">
                <h4 className="font-bold text-base">
                  {placeData.name}{' '}
                  {placeData.rating && (
                    <span className="text-xs font-normal mt-1">{placeData.rating} ★</span>
                  )}
                </h4>

                <p className="text-xs mb-1">{placeData.formatted_address}</p>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLong}`}
                  target="_blank"
                  className="inline-flex items-center text-xs gap-2"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M215 17L17 215C6.1 225.9 0 240.6 0 256s6.1 30.1 17 41L215 495c10.9 10.9 25.6 17 41 17s30.1-6.1 41-17L495 297c10.9-10.9 17-25.6 17-41s-6.1-30.1-17-41L297 17C286.1 6.1 271.4 0 256 0s-30.1 6.1-41 17zM385 257l-72 72c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-78.1 0c-13.3 0-24 10.7-24 24l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40c0-39.8 32.2-72 72-72l78.1 0-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9z" />
                  </svg>
                  Get directions
                </a>
              </div>
            )}
          </div>
        )}

        {mapLat == null && mapLong == null && mapUrl && (
          <iframe
            className="w-full"
            title="Google Map embed of The Refinery's location"
            src={mapUrl}
            width="600"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>

      {openForm === 'project' && <FormProject onClose={() => setOpenForm(null)} />}
      {openForm === 'chat' && <FormChat onClose={() => setOpenForm(null)} />}
    </div>
  )
}
