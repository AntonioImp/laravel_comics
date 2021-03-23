<?php

namespace App\Http\Controllers;

use DB;
use App\Comic;
use App\Content;
use App\Archive;
use App\ComicMongo;
use App\ArchiveMongo;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function nome($id)
    {
        $res = Archive::find($id);
        if($res != null)
        {
            if($res->id_utente == auth()->user()->id)
                return view('raccolta')->with('title', (string)$res->nome)->with('id', $res->id);
        }
        return redirect('/home');
    }

    public function carica($id)
    {
        $ctrl = Archive::find($id);
        if($ctrl != null)
        {
            if($ctrl->id_utente == auth()->user()->id)
            {
                $contenuto = Archive::find($id);
                $contenuto = $contenuto->comics;
                return response()->json($contenuto);
            }
        }
        return redirect('/home');
    }

    public function elimina(Request $request)
    {
        if ($request->has('idCap') && $request->has('idRacc'))
        {
            DB::beginTransaction();

            $fumetto = Comic::find($request->idCap);
            $raccolta = Archive::find($request->idRacc);

            $flag = 0;

            if($raccolta->immagine == $fumetto->copertina)
            {
                $flag = 1;
            }

            $res = Content::where('id_fumetto', $request->idCap)->where('id_raccolta', $request->idRacc)->delete();
            $archive = ArchiveMongo::find((int)$request->idRacc);
            $comic = ComicMongo::where('id', 'like', (int)$request->idCap)->get();
            $archive->comics()->detach($comic[0]->_id);
            ComicMongo::destroy($comic[0]->_id);

            if($flag == 1)
            {
                $fumetto = $raccolta->comics->first();
                if($fumetto == null)
                {
                    $archive->immagine = 'images/empty.jpg';
                    $raccolta->immagine = 'images/empty.jpg';
                } else {
                    $raccolta->immagine = $fumetto->copertina;
                    $archive->immagine = $fumetto->copertina;
                }
                $raccolta->save();
                $archive->save();
            }

            $res = Content::where('id_fumetto', $request->idCap)->get();
            if($res == '[]')
            {
                Comic::destroy($request->idCap);
            }

            DB::commit();

            return 1;
        }
        return -1;
    }
}
