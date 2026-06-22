import React from 'react';

export default function SubPageBackground() {
  return (
    <>
      <div 
        className="fixed inset-0 z-[-2] bg-[length:100vw_auto] md:bg-cover bg-top bg-no-repeat bg-fixed bg-white" 
        style={{ backgroundImage: "url('/factory_exterior2.jpg')" }}
      />
      <div className="fixed inset-0 z-[-1] bg-white/75 backdrop-blur-[2px]" />
    </>
  );
}
