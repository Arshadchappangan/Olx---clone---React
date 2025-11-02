import React from 'react'
import fb from '../../assets/fb.png'
import instagram from '../../assets/instagram.jpg'
import youtube from '../../assets/youtube.jpg'
import twitter from '../../assets/twitter.png'

const Footer = () => {

    let popular = ['Kolkata','Mumbai','Chennai','Pune'];
    let trending = ['Bhubaneswar','Hyderabad','Chandigarh','Nashik'];
    let about = ['Tech@OLX','Careers'];
    let olx = ['Blog','Help','Sitemap','Legal & Privacy information','Vulnerability Disclosure Program'];

    return (
        <footer className="bg-gray-200 border-t mt-2">
            {/* Top Footer Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="grid md:grid-cols-5 ">
                    {/* Popular Locations */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">POPULAR LOCATIONS</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {
                                popular.map(place => <li><a href="#" className="hover:text-blue-700">{place}</a></li> )
                            }
                        </ul>
                    </div>

                    {/* Trending Locations */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">TRENDING LOCATIONS</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {
                                trending.map(place => <li><a href="#" className="hover:text-blue-700">{place}</a></li>)
                            }
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">ABOUT US</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {
                                about.map(option => <li><a href="#" className="hover:text-blue-700">{option}</a></li>)
                            }
                        </ul>
                    </div>

                    {/* OLX */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">OLX</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {
                                olx.map(option => <li><a href="#" className="hover:text-blue-700">{option}</a></li>)
                            } 
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                <div className="border-t">
                    <h3 className="font-bold text-gray-900 mb-4">FOLLOW US</h3>
                    <div className="flex items-center space-x-1 mb-4">
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <img src={fb} className='h-full' alt="" />
                            </div>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center">
                                <img src={instagram} className='rounded-full' alt="" />
                            </div>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <img src={youtube} className='rounded-full' alt="" />
                            </div>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <img src={twitter} alt="" />
                            </div>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                        </a>
                    </div>

                    {/* App Download Buttons */}
                    <div className="flex flex-col gap-2">
                        <a href="#" className="inline-block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
                        </a>
                        <a href="#" className="inline-block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-10" />
                        </a>
                    </div>
                </div>


                </div>
            </div>

            {/* Bottom Footer Section - Blue Background */}
            <div className="bg-blue-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Logo Section */}
                    <div className="flex flex-wrap items-center justify-between gap-8 mb-6 pb-6 border-b border-blue-900">
                        <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1" alt="CarTrade Tech" className="h-20 opacity-80" />
                        <img src="https://statics.olx.in/external/base/img/cartrade/logo/olx_2025.svg?v=1" alt="OLX" className="h-16" />
                        <img src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1" alt="CarWale" className="h-14 opacity-80" />
                        <img src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1" alt="BikeWale" className="h-14 opacity-80" />
                        <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1" alt="CarTrade" className="h-14 opacity-80" />
                        <img src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1" alt="Mobility Outlook" className="h-16 opacity-80" />
                    </div>

                    {/* Footer Links and Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <div className="flex gap-3 mb-4 md:mb-0">
                            <a href="#" className="hover:text-gray-300">Help</a>
                            <span>-</span>
                            <a href="#" className="hover:text-gray-300">Sitemap</a>
                        </div>
                        <div className="text-gray-300">
                            All rights reserved © 2006-2025 OLX
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
