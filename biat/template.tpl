<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>encryption/decryption</title>
<script src="../jquery-1.3.1.min.js" type="text/javascript"></script>
<script src="../jquery-ui-personalized-1.6rc6.min.js" type="text/javascript"></script>
<script src="../sha256.js" type="text/javascript"></script>
<script src="../aes.js" type="text/javascript"></script>
<script src="../jsbn.js" type="text/javascript"></script>
<script src="../prng4.js" type="text/javascript"></script>
<script src="../rng.js" type="text/javascript"></script>
<script src="../jsbn2.js" type="text/javascript"></script>
<script src="../rsa.js" type="text/javascript"></script>
<script src="../rsa2.js" type="text/javascript"></script>
<script src="../dse.js" type="text/javascript"></script>
<script src="../mns.js" type="text/javascript"></script>
<script src="../mns-pp.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="../mns.css" />
<link type="text/css" href="../theme/ui.all.css" rel="Stylesheet" />
</head>
<body>
<noscript>
<p>We are extremely pleased that you wish to use our service.</p>  
<p>Unfortunately we really do require <a href="https://www.google.com/adsense/support/bin/answer.py?hl=en&answer=12654">javascript</a> in order to get anything done.</p>
</noscript>
<div id="content" class="ui-corner-top">
<h1><a href="/"><img src="/logo.png" alt="Drop Secret"></img></a></h1>
<div id="toolbar"><div id="gotodiv">
<label for="dest-path">Go to drop page:</label>
<input type="text" id="dest-path"/><button id="goto">Go</button>
</div></div>
<div id="documentation" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
<li class="ui-state-default ui-corner-all"><a href="#welcomedoc">w</a></li>
<li class="ui-state-default ui-corner-all"><a href="#subjectdoc">s</a></li>
<li class="ui-state-default ui-corner-all"><a href="#messagedoc">m</a></li>
<li class="ui-state-default ui-corner-all"><a href="#decryptdoc">d</a></li>
</ul>
<div id="welcomedoc" class="ui-tabs-panel ui-widget-content ui-corner-bottom"><h3>Welcome</h3><p>You probably have come to this page to leave secret messages for the page owner.  All you need to do is fill out the subject and message field and your browser will take care of the rest.</p><p>If you are the page owner (ie you know the pass phrase) just click on <em>Secrets</em> to begin receiving your messages.</p></div>
<div id="subjectdoc" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"><h3>Subject Warning</h3><p>Be careful not to put anything sensitive in the subject line.  The subject line is <strong>not encrypted</strong> so anyone who comes to this page will be able to see what was written.</p></div>
<div id="messagedoc" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"><h3>Message</h3><p>This is where you can put sensitive information to pass on to the page owner.  Your message will be encrypted with a public key by your own browser.
We will only ever see the encrypted version of your message.</p></div>
<div id="decryptdoc" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"><h3>Decrypting</h3><p>If you enter the correct pass phrase you will be able to decrypt the messages posted on this page by clicking on the <em>Decrypt</em> link under the subject.</p></div>
</div>
<div id="ppcontent" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
	<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
		<li class="ui-state-default ui-corner-all"><a href="#postpage">Post</a></li>
		<li id="decrypt"  class="ui-state-default ui-corner-all"><a href="#decryptpage">Secrets</a></li>
	</ul>
	<div id="postpage" class="ui-tabs-panel ui-widget-content ui-corner-bottom">
		<div id="subjectbox">
		<label>Subject</label>
		<input type="text" name="subject" id="subject" />
		</div>
		<div id="messagebox">
		<label>Message</label>
		<textarea type="text" name="message" id="message"></textarea><br />
		</div>
		<input type="button" value="Encrypt" id="encrypt" /><br />
	</div>
	<div id="decryptpage" class="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">
		<h3>Pass phrase</h3>
		<input type="password" name="passphrase" id="passphrase" /><br />
		<div id="posts"></div>
	</div>
</div>
</div>
<div id="footer-links">
<ul>
<li><a href="/about">about us</a></li>
<li><a href="/howitworks">how it all works</a></li>
<li><a href="/contactus">contact us</a></li>
</ul>
</div>
</body>
</html>

