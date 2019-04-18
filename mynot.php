<?php

$ch = curl_init();
$targeturl="https://rvk.uni-regensburg.de/rvko_simple/mynot.php?".$_SERVER['QUERY_STRING'];

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
