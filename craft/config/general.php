<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
  '*' => array(
    'allowAutoUpdates' => true,
    'generateTransformsBeforePageLoad' => true,
    'omitScriptNameInUrls' => true
  ),

  '.local' => array(
    'cache' => false,
    'devMode' => true,
    'includeBrowserSyncSnippet' => true,
    'siteUrl' => 'http://domain.local/',
    'trackAnalytics' => false,
    'useCompressedJs' => false
  ),

  '.linus' => array(
    'cache' => false,
    'devMode' => true,
    'includeBrowserSyncSnippet' => false,
    'siteUrl' => 'http://domain.linus/',
    'trackAnalytics' => false,
    'useCompressedJs' => false
  ),

  '.paramoredev.com' => array(
    'cache' => true,
    'devMode' => false,
    'includeBrowserSyncSnippet' => false,
    'siteUrl' => 'http://domain.paramoredev.com/',
    'trackAnalytics' => false,
    'useCompressedJs' => true
  ),

  'visitcentralflorida.org' => array(
    'cache' => true,
    'devMode' => false,
    'includeBrowserSyncSnippet' => false,
    'siteUrl' => 'http://domain.com/',
    'trackAnalytics' => true,
    'useCompressedJs' => true
  )
);
