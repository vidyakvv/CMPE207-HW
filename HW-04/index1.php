<?php
    $mc = new Memcache;
    $mc->connect('127.0.0.1:11211');
    $mc->set('username', 'Shivangi_Nagpal', 0 ,30);
    echo "Added username to memcache";
