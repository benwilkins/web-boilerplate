<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
  '*' => array(
    'tablePrefix' => 'craft'
  ),

  '.local' => array(
    'server'   => 'localhost',
    'database' => 'domain_craft_local',
    'user'     => 'root',
    'password' => 'pairmore'
  ),

  '.linus' => array(
    'server'   => '10.1.10.11',
    'database' => 'domain_craft_testing',
    'user'     => 'root',
    'password' => 'pairmore',
  ),

  '.paramoredev.com' => array(
    'server'   => '127.0.0.1',
    'database' => 'domain_craft_staging',
    'user'     => 'root',
    'password' => 'pairmore',
  ),

  'visitcentralflorida.org' => array(
    'server'   => '127.0.0.1',
    'database' => 'domain_craft',
    'user'     => 'root',
    'password' => 'pairmore',
  )
);
