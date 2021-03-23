<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Comic Vine') }}</title>

    <!-- Scripts -->
    <script src="http://code.jquery.com/jquery-3.4.1.min.js" type="text/javascript"></script>
    <script src="{{ asset('js/request.js') }}" defer></script>
    @yield('script')

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/styleContent.css') }}" rel="stylesheet">
</head>
<body>
    <div id="contenitore">
        <section id="linkMenu">
            <img src="../images/logo.png" id="logo">
            <h1 id="welcome">Benvenuto/a,</h1>
            <h1 id="utente">{{ auth()->user()->username }}</h1>
            <a href="/home" class="linkP">Home</a>
            <a href="/search" class="linkP">Ricerca</a>
            <a href="{{ route('logout') }}" class="linkP" onclick="event.preventDefault();
                document.getElementById('logout-form').submit();">Logout</a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST">
                @csrf
            </form>
            <p id="menu"> M<br>E<br>N<br>Ù </p>
        </section>
        @yield('upper')
        <section id="contenuto" data-archive-id=@yield('id')>
            @yield('creazioneRaccolta')
        </section>
        @yield('modal')
    </div>
</body>
