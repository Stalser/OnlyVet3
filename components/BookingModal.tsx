
'use client';
import {useState} from 'react';
import BookingWidget from '@/components/BookingWidget';
export default function BookingModal(){const[o,s]=useState(false);return <>{!o&&<button onClick={()=>s(true)}>Записаться</button>}{o&&<div className='fixed inset-0 bg-black/40 flex items-center justify-center'><div className='bg-white p-4 rounded-xl max-w-lg w-full'><button onClick={()=>s(false)}>✕</button><BookingWidget/></div></div>}</>}
