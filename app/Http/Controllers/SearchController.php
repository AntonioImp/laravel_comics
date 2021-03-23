<?php

namespace App\Http\Controllers;

use DB;
use App\Archive;
use App\Content;
use App\Comic;
use App\ComicMongo;
use App\ArchiveMongo;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        if ($request->has('text'))
        {
            $api_key = "8ffc2c4bae50f76eeaf819a1bb0a238ff59a9627";
            $text = $request->text;
            $text = str_replace(" ", "-", $text);

            //avvia una sessione curl
            $curl = curl_init();
            //ritorna il risultato come una stringa
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            //setta lo user agent da usare nella richiesta http
            curl_setopt($curl, CURLOPT_USERAGENT, "cvs");

            $url = 'https://comicvine.gamespot.com/api/search/?api_key='.$api_key.'&format=json&query='.$text.'&resources=issue&sort=name:asc&limit=50';
            //imposta l'url con la richiesta get
            curl_setopt($curl, CURLOPT_URL, $url);
            //esegue la sessione curl, passa l'url e le opzioni impostate al browser
            $result = curl_exec($curl);

            curl_close($curl);

            return $result;
        }
        return -1;
    }

    public function raccolte()
    {
        $raccolte = Archive::where('id_utente', auth()->user()->id)->get();
        return $raccolte;
    }

    public function aggiungi(Request $request)
    {
        if ($request->has('id') && $request->has('nome') && $request->has('copertina') && $request->has('uscita') && $request->has('descrizione')
                && $request->has('capitolo') && $request->has('volume') && $request->has('raccolta'))
        {
            DB::beginTransaction();

            $res = Comic::all()->where('id', $request->id);

            if($res == '[]')
            {
                $comic = new Comic;
                $comic->id = $request->id;
                $comic->nome = $request->nome;
                $comic->copertina = $request->copertina;
                $comic->uscita = $request->uscita;
                $comic->descrizione = strip_tags($request->descrizione);
                $comic->capitolo = $request->capitolo;
                $comic->volume = $request->volume;
                $comic->save();
            }

            $id = Archive::select('id')->where('nome', $request->raccolta)->where('id_utente', auth()->user()->id);
            $id = $id->get()->get(0)->id;
            $res = Content::all()->where('id_raccolta', $id)->where('id_fumetto', $request->id);

            if($res == '[]')
            {
                $content = new Content;
                $content->id_raccolta = $id;
                $content->id_fumetto = $request->id;
                $content->save();

                $archive = ArchiveMongo::find((int)$id);
                $fumetto = new ComicMongo;
                $fumetto->id = $request->id;
                $fumetto->nome = $request->nome;
                $fumetto->copertina = $request->copertina;
                $fumetto->uscita = $request->uscita;
                $fumetto->descrizione = strip_tags($request->descrizione);
                $fumetto->capitolo = $request->capitolo;
                $fumetto->volume = $request->volume;
                $archive->comics()->save($fumetto);

                $sfondo = Archive::find($id);
                if($sfondo->immagine == 'images/empty.jpg')
                {
                    $sfondo->immagine = $request->copertina;
                    $sfondo->save();

                    $mongo = ArchiveMongo::find((int)$id);
                    $mongo->immagine = $request->copertina;
                    $mongo->save();
                }
            } else {
                return -1;
            }

            DB::commit();

            return 1;
        }
        return -2;
    }
}
