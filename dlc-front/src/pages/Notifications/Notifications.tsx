import React from 'react'
import ProfileActions from '../../components/ProfileActions/ProfileActions'
import Filter from '../../components/Filter/Filter'
import Actions from '../../components/Actions/Actions'

type Props = {}

function Notifications({}: Props) {
  return (
<main className="bg-gray-900 sm:p-6 space-y-6 xl:w-768 w-full flex-shrink-0 border-r border-gray-200 border-gray-800 h-screen overflow-y-auto lg:block hidden">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between bg-dark-gray">
        <div className="mr-6">
          <h1 className="text-4xl mb-2 text-white font-weight-300">
            Notificaciones
          </h1>
          <h2 className="text-gray-300 ml-0.5">Gestión Íntegra de Productos</h2>
        </div>
        <div className="justify-center">
          <div className="mt-6">
            <ProfileActions />
          </div>
        </div>
      </div>
        <Actions />
      <div>
      {/* Masonry-style grid for MyClass */}
      <section className="gap-6">
        <Filter />
      </section>

      </div>
    </main>
  )
}

export default Notifications