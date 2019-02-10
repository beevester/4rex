<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Purchases;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CurrencyController extends Controller
{
    private $access_key = '9700b098baa2f958716b1bd20df93e20';

    public function liveCurrency()
    {
        return $this->pairs($this->storedCurrency()['quotes']);
        $client = new Client();
        $request = $client->get('http://apilayer.net/api/live?access_key=' . $this->access_key);

        $response = $request->getBody()->getContents();
        $exchangeRates = json_decode($response, true);

        if (!$exchangeRates['success'])
        {
            return $this->pairs($this->storedCurrency()['quotes']);
        }

        return $this->pairs($exchangeRates['quotes']);
    }

    public function storedCurrency()
    {
        $currency = Currency::all();

        foreach ($currency as $pair)
        {
            $code = $pair->attributesToArray()['code'];
            $quotation = $pair->attributesToArray()['quotation'];
            $pairs['quotes'][$code] = $quotation;
        }

        return $pairs;
    }


    public function pairs($quotes)
    {
        $q = [];

        foreach ($quotes as $currency => $quote)
        {
            $term = $this->quote($currency, $quote)['term'];
            $base = $this->quote($currency, $quote)['base'];
            if ($term == 'USD' ||
                $term == 'GBP' ||
                $term == 'KES' ||
                $term == 'EUR' ||
                $base == 'USD' ||
                $base == 'GBP' ||
                $base == 'KES' ||
                $base == 'EUR'
            )
            {
                $quotation = $this->quote($currency, $quote)['quotation'];

                $q[] = ['base' => $base, 'quote' => $term, 'quotation' => $quotation];
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
        $option = $quotation->get('option');
        $base = $quotation->get('base');
        $quote = $quotation->get('quote');
        $rate = $quotation->get('quotation');

        $quote == 'USD' || $base == 'USD' ? $surcharge = 7.5/100: null;
        $quote == 'GBP' || $base == 'GBP' ? $surcharge =  5/100: null;
        $quote == 'EUR' || $base == 'EUR' ? $surcharge = 5/100: null;
        $quote == 'KES' || $base == 'KES' ? $surcharge = 2.5/100: null;

        if ($option == 'sell')
        {
            $calculation = 1 / $rate  * $value;
            $calculation += $calculation * $surcharge;
        }

        if ($option == 'buy')
        {
            $calculation = $rate * $value;
            $calculation += $calculation * $surcharge;
        }

        return response()->json($calculation);
    }

    public function purchase(Request $request)
    {
        this.Purchases::create($request->all());
        return DB::table('purchases')->where(['email' => $request->email]);
    }

}
