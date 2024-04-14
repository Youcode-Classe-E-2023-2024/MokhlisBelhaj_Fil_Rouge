<x-head></x-head>
<style>
    .outline-text {
        text-shadow:
            0 0 5px rgba(0, 0, 0, 0.5),
            0 0 10px rgba(0, 0, 0, 0.5),
            0 0 15px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(0, 0, 0, 0.5),
            0 0 25px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(0, 0, 0, 0.5),
            0 0 35px rgba(0, 0, 0, 0.5);
    }

    .text-3d {
        text-shadow:
            1px 1px 0 #000000,
            2px 2px 0 #000000,
            3px 3px 0 #000000,
            4px 4px 0 #000000,
            5px 5px 0 #000000,
            6px 6px 0 #000000,
            7px 7px 0 #000000;
    }

    button {
        font-family: inherit;
        font-size: 18px;
        /* background: linear-gradient(to bottom, #4dc7d9 0%,#66a6ff 100%); */
        color: white;
        padding: 0.8em 1.2em;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 25px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
    }

    button:hover {
        transform: translateY(-3px);
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    }

    button:active {
        transform: scale(0.95);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }

    button span {
        display: block;
        margin-left: 0.4em;
        transition: all 0.3s;
    }



    .si {
        font-family: 'Arizonia', cursive;


    }
</style>
<section class="flex flex-col md:flex-row h-screen items-center"
    style="background-image: url('https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')">

    

    <div
        class=" w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/2 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center backdrop-blur-lg">

        <div class="w-full h-100">

            <h1 class=" text-8xl text-white text-center font-semibold outline-text si">ArtHub</h1>


            <h1 class="text-xl md:text-4xl text-white font-bold leading-tight mt-12 text-3d">Dive into Creativity: Connect Globally, Create Uniquely</h1>

            <form class="mt-6" action="#" method="POST" id="loginForm">
             
                <div>
                    <label class="block  font-bold">Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter Name"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autofocus autocomplete required>
                </div>
                <div class="mt-4">
                    <label class="block  font-bold">Email Address</label>
                    <input type="email" name="Email" id="email" placeholder="Enter Email Address"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                        focus:bg-white focus:outline-none"
                        autofocus autocomplete required>
                </div>

                <div class="mt-4">
                    <label class="block font-bold">Password</label>
                    <input type="password" name="Password" id="password" placeholder="Enter Password" minlength="6"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                        required>
                </div>
                <div class="mt-4">
                    <label class="block font-bold">password confirmation</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Enter Password" minlength="6"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                        required>
                </div>

                <div class="text-right mt-2">
                    <a href="#"
                        class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot
                        Password?</a>
                </div>

                <button type="submit"
                    class="w-full block bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">Log
                    In</button>

            </form>

            <hr class="my-6 border-gray-300 w-full">



            <p class="mt-8">Need an account? <a href="{{route('register.form')}}"
                    class="text-blue-500 hover:text-blue-700 font-semibold">Create an
                    account</a></p>
        </div>
    </div>
    <div class=" hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
    </div>


</section>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var formData = new FormData(loginForm);
            
            fetch('/api/login', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function(data) {
                console.log(data);
                if (data.success) {
                    alert(data.success); // Display success message
                    // Redirect or perform other actions upon successful login
                } else {
                    alert(data.error); // Display error message
                }
            })
            .catch(function(error) {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    });
</script>
