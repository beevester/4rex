<?php

namespace App\Http\Controllers;

use App\Purchases;
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

        $zarBase = $quotes['USDZAR'];


        foreach ($quotes as $currency => $quote)
        {
            $term = $this->quote($currency, $quote)['term'];
            if ($term == 'USD' || $term == 'GBP' || $term == 'KES' || $term == 'EUR')
            {
                $quotation = $this->quote($currency, $quote)['quotation'];
                $quotation = $zarBase/$quotation;

                $q[] = ['base' => 'ZAR', 'quote' => $term, 'quotation' => $quotation];
            }
        }
        return $q;
    }

    public function quote($currency, $quote)
    {
        $pair = str_split($currency, 3);

        $base = $pair[0];
        $term = $pair[1];
        return ['base' => $base, 'term' => $term, 'quotation' => $quote];
    }

    public function calculate(Request $quotation)
    {

        $value = $quotation->get('value');
        $base = $quotation->get('base');
        $quote = $quotation->get('term');

        $quote == 'USD' || $base == 'USD' ? $surcharge = 7.5/100: null;
        $quote == 'GBP' || $base == 'GBP' ? $surcharge =  5/100: null;
        $quote == 'EUR' || $base == 'EUR' ? $surcharge = 5/100: null;
        $quote == 'KES' || $base == 'KES' ? $surcharge = 2.5/100: null;


        return response()->json($value*$surcharge);

    }

    public function purchase(Request $request)
    {
        this.Purchases::create($request->all());
        return DB::table('purchases')->where(['email' => $request->email]);
    }

}
