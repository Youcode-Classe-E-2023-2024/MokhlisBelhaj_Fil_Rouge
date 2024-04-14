<div>
    <style>
        /* artists scroll */

        @keyframes carouselAnim {
            0% {
                transform: translateX(0);
            }

            100% {
                transform: translateX(calc(-100% + (6 * 300px)));
            }
        }

        @media only screen and (max-width: 768px) {
            .container .carousel-items {
                animation: carouselAnim 60s infinite linear;
            }

            @keyframes carouselAnim {
                0% {
                    transform: translateX(0);
                }

                100% {
                    transform: translateX(calc(-100% + (6 * 300px)));
                }
            }
        }

        .carousel-items:hover {
            animation-play-state: paused !important;
        }

        .carousel-focus:hover {
            transition: all 0.8s;
            transform: scale(1.1);
        }
    </style>





    <h1 class="hero__heading">
        Our Artists
    </h1>

    <div class="container mx-auto w-full overflow-hidden relative">
        <div class="w-full h-full absolute">
            <div class="w-1/4 h-full absolute z-50 left-0"
                style="background: linear-gradient(to right, #edf2f7 0%, rgba(255, 255, 255, 0) 100%);"></div>
            <div class="w-1/4 h-full absolute z-50 right-0"
                style="background: linear-gradient(to left, #edf2f7 0%, rgba(255, 255, 255, 0) 100%);"></div>
        </div>

        <div class="carousel-items flex items-center justify-center"
            style="width: fit-content; animation: carouselAnim 10s infinite alternate linear;">

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <span class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</span>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>

            <div class="carousel-focus flex items-center flex-col relative bg-white mx-5 my-10 px-4 py-3 rounded-lg shadow-lg"
                style="width: 270px;">
                <p class="text-teal-400 font-bold text-xl mb-3">Sup3r-Us3r</p>
                <img class="h-16 w-16 rounded-full shadow-2xl"
                    src="https://pbs.twimg.com/profile_images/830533062807191552/TbkWKnnv_400x400.jpg" alt="Img">
                <p class="mt-3 text-gray-600 text-center">"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam!"</p>
                <button
                    class="mt-4 mb-2 bg-teal-400 rounded-full px-12 py-1 text-gray-100 font-semibold hover:bg-teal-300 focus:outline-none">Button</button>
            </div>
        </div>

    </div></div>