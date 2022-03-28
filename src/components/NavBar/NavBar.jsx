import { NavLink } from "react-router-dom";
import { useState, useEffect, Fragment } from 'react'
import * as placeService from "../../services/placeService"
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, } from '@heroicons/react/solid'
import { MenuIcon } from '@heroicons/react/outline'
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
const NavBar = ({ user, handleLogout }) => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    placeService.getAllPlaces()
      .then(places => setPlaces(places))
  }, [])

  return (
    <>
      {user ? (
        <div>
          <Popover className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href="/">
                    <span className="sr-only">Trouvaille</span>
                  </a>
                </div>
                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                        >
                          <span>Cities</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-600' : 'text-gray-400',
                              'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                <a
                                  href="/cities"
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">Cities</p>
                                    <p className="mt-1 text-sm text-gray-500">Browse all cities</p>
                                  </div>
                                </a>
                              </div>

                              <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                                <div>
                                  <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">Admin</h3>
                                  <ul role="list" className="mt-4 space-y-4">
                                    <li className="text-base truncate">
                                      <a href="/cities/add" className="font-medium text-gray-900 hover:text-gray-700">
                                        Add a City
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                        >
                          <span>Places</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-600' : 'text-gray-400',
                              'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                <a
                                  href="/places"
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">Places</p>
                                    <p className="mt-1 text-sm text-gray-500">Browse all places</p>
                                  </div>
                                </a>
                                <a
                                  href="/places/add"
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">Add a Place</p>
                                    <p className="mt-1 text-sm text-gray-500">Add a new place</p>
                                  </div>
                                </a>
                                <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">Quick Search</p>
                                <p><SearchBar placeholder="Search here" data={places} /></p>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                        >
                          <span>{user.name}</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-600' : 'text-gray-400',
                              'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                <a
                                  href="/itineraries"
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">My Itineraries</p>
                                  </div>
                                </a>
                                <a
                                  href="/starred"
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">Starred Places</p>
                                  </div>
                                </a>
                              </div>

                              <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                                <div>
                                  <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">Account</h3>
                                  <ul role="list" className="mt-4 space-y-4">
                                    <li className="text-base truncate">
                                      <a href="/changePassword" className="font-medium text-gray-900 hover:text-gray-700">
                                        Change Password
                                      </a>
                                    </li>
                                    <li className="text-base truncate">
                                      <a href="/" className="font-medium text-gray-900 hover:text-gray-700" onClick={handleLogout}>
                                        Log out
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                </Popover.Group>
              </div>
            </div>
          </Popover>
        </div>
      ) : (
        <Popover className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-end md:space-x-10">
              <a href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </a>
              <a
                href="/signup"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-400"
              >
                Sign up
              </a>
            </div>
          </div>
        </Popover>
      )}
    </>
  );
};

export default NavBar;