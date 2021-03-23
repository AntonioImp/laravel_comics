@extends('layouts.inner')

@section('script')
    <script src="{{ asset('js/scriptHome.js') }}" defer></script>
@endsection

@section('upper')
    <h1>Le tue raccolte</h1>
@endsection

@section('creazioneRaccolta')
    <div id="creazioneRaccolta">
        <img src="images/aggiungi raccolta.png">
        <div id="nomeRaccolta" class="hidden">
            <input type="text" placeholder="Inserisci il nome della raccolta">
            <p id="errore"></p>
            <button>Aggiungi</button>
        </div>
    </div>
@endsection
