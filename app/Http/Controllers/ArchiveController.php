<?php

namespace App\Http\Controllers;

use App\Comic;
use App\Archive;
use App\Content;
use App\ArchiveMongo;
use App\ComicMongo;
use DB;
use Illuminate\Http\Request;

class ArchiveController extends Controller
{
    public function load()
    {
        return Archive::where('id_utente', auth()->user()->id)->get();
    }

    public function store(Request $request)
    {
        if ($request->has('nome'))
        {
            $res = Archive::where('id_utente', auth()->user()->id)
                            ->where('nome', $request->nome)->get();

            if($res == '[]')
            {
                $archive = new Archive;
                $archive->id_utente = auth()->user()->id;
                $archive->nome = $request->nome;
                $archive->immagine = "images/empty.jpg";
                $archive->save();

                ArchiveMongo::create([
                    '_id' => $archive->id,
                    'id_utente' => auth()->user()->id,
                    'nome' => $request->nome,
                    'immagine' => "images/empty.jpg",
                ]);

                $id = Archive::where('id_utente', auth()->user()->id)
                                ->where('nome', $request->nome)->get();

                return [
                    "imageURL" => "images/empty.jpg",
                    "nomeRaccolta" => $request->nome,
                    "idRaccolta" => $id->get(0)->id,
                ];
            } else {
                return -1;
            }
        }
        return -2;
    }

    public function delete(Request $request)
    {
        if ($request->has('id'))
        {
            DB::beginTransaction();

            $content = Content::where('id_raccolta', $request->id)->get();
            Archive::destroy($request->id);
            ArchiveMongo::destroy((int)$request->id);

            foreach($content->toArray() as $tmp)
            {
                $res = Content::where('id_fumetto', $tmp['id_fumetto'])->get();
                if($res == '[]')
                {
                    Comic::destroy($tmp['id_fumetto']);
                }
                $_id = ComicMongo::where('id', 'like', (int)$tmp['id_fumetto'])->get();
                ComicMongo::destroy($_id[0]->_id);
            }

            DB::commit();

            return 1;
        }
        return -1;
    }
}
