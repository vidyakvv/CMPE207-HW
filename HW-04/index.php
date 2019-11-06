<?php
    $mc = new Memcache;
    $mc->connect('127.0.0.1:11211');
    $mypage = $mc->get('mypage');

    if($mypage){
        echo 'Getting page from cached memory'; 
        echo '<br>';
        $time_start = microtime(time);
        echo $mypage;
        $time_end = microtime(time);
        $execution_time = ($time_end - $time_start)*1000000;
        echo '<br>';
        //execution time of the script
        echo '<b>Total Execution Time:</b> '.$execution_time.' usec';
    
        }else{

        echo 'Nothing is cached';
        echo '<br>';
        $filename = 'mypage.php';
        
        $time_start = microtime(time);
        $handle = fopen($filename,'r') or die("can't open file");
        $contents = fread($handle, filesize($filename));
        fclose($handle);
        echo $contents;
        $time_end = microtime(time);
        $execution_time = ($time_end - $time_start)*1000000;

        echo '<br>';
        //execution time of the script
        echo '<b>Total Execution Time:</b> '.$execution_time.' usec';
        $mc->set('mypage',$contents, 0, 30);
    }
