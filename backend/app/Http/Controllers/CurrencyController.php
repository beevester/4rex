<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    private $access_key = '9700b098baa2f958716b1bd20df93e20';

    public function liveCurrency() {
        $client = new Client();
        $request = $client->get('http://apilayer.net/api/live?access_key='.$this->access_key);
        $response =$request->getBody()->getContents();
        $exchangeRates = json_decode($response, true);

        return $this->pairs($exchangeRates['quotes']);
    }

    public function pairs($quotes)
    {
        $q = [];

        foreach ($quotes as $currency => $quote)
        {
            $base = $this->quote($currency, $quote)[0];
            $term = $this->quote($currency, $quote)[1];
            $quotation = $this->quote($currency, $quote)[2];
            $buy = $this->quote($currency, $quote)[3];
            $sell = $this->quote($currency, $quote)[4];
            $q[] = ['base' => $base, 'quote' => $term, 'quotation' => $quotation, 'buy' => $buy, 'sell' => $sell];
        }

        return $q;

    }

    public function quote($currency, $quote)
    {
        $pair = str_split($currency, 3);

        $base = $pair[0];
        $term = $pair[1];
        $buy = 1 / $quote;
        $sell = 1 / $buy;
        return [$base, $term, $quote, $buy, $sell];
    }

}
