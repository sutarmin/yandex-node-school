import React from 'react'
import  { renderToString } from 'react-dom/server'
import App from '../client/components/App'

module.exports = (() => {
    return `<html>
	<head>
		<meta charset="utf-8">
        <link rel="shortcut icon" href="/public/favicon.ico">
        <link rel="stylesheet" href="/build/7a7cbe661e1ff8fe8c7bbea03406b51a.css">
		<link rel="stylesheet" href="/build/7890a0711bb3e9f82e928071c819952f.css">
		<link rel="stylesheet" href="/build/dc50a1d4274ac1648561ef53dba79945.css">
		<link rel="stylesheet" href="/build/dcd7fa7004b8e90eba82a7fc67e7c839.css">
		<title>Яндекс-кошелёк</title>
	</head>
	<body>
		<div id="root">${renderToString(<App />)}</div>
	<script type="text/javascript" src="bundle.js"></script></body>
</html>`;
})();