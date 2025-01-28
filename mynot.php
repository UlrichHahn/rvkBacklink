<?php

$ch = curl_init();
// in response to verified SQL injection attack
// the query string is restricted to valid RVK notations / ranges
$qs="";
$pattern='/nt_in\=[A-Z0-9\+\-]+$/'; // RVK notation / ranges only
//$pattern='/.*/'; // uncomment for test against open pattern

if(preg_match($pattern,$_SERVER['QUERY_STRING'])){
	$qs=$_SERVER['QUERY_STRING'];
	}
$targeturl="https://rvk.uni-regensburg.de/rvko_simple/mynot.php?".$qs;


curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
#curl_setopt($ch, CURLOPT_COOKIEJAR, '-');
#curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($ch, CURLOPT_URL, $targeturl); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$contents=curl_exec($ch);

#echo $contents;

echo curl_error($ch);
curl_close($ch);

echo str_replace('</HEAD>', '<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="rvkBacklink.js"></script></HEAD>', $contents);

?>
