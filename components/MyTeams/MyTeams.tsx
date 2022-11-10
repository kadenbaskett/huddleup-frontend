import React from 'react'
import './MyTeams.module.css'

export default function MyTeams() {
  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        My Teams
      </div>
      <div className='flex justify-center p-3 text-2xl '>this sucks</div>
      <div className='flex justify-center p-3 text-2xl '>Jakes gay team</div>
      <div className='flex justify-center p-3 text-2xl '>kadens gay team</div>
      <div className='flex justify-center p-3 text-2xl'>my cool ass team</div>
    </div>
  )
}
