@extends('layouts.inner');

@section('upper')
    <h1>{{ $title }}</h1>
@endsection

@section('id', $id)

@section('script')
    <script src="{{ asset('js/scriptCollection.js') }}" defer></script>
@endsection

@section('modal')
    <section id="modal-view" class="hidden"></section>
@endsection
