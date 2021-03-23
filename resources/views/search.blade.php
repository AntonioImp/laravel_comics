@extends('layouts.inner')

@section('script')
    <script src="{{ asset('js/scriptSearch.js') }}" defer></script>
@endsection

@section('upper')
    <form name="search_data" id="search">
        <p>
            <label for="ric">Cerca: <input type="text" name="testo" id="ric" placeholder=" Testo da cercare"></label>
        </p>
        <p>
            <label>&nbsp;<input type="submit" value="Cerca" id="sub"></label>
        </p>
    </form>
    <div id="emptyRes"></div>
@endsection

@section('modal')
    <section id="modal-view" class="hidden"></section>
@endsection
