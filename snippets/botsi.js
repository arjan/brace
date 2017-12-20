ace.define("ace/snippets/botsi",["require","exports","module"],function(e,t,n){"use strict";t.snippetText='########################################\n# Botsi snippets                       #\n########################################\n\nsnippet say\n	say "${1:Hello there!}"\n\nsnippet sleep\n	sleep ${1:3}\n\nsnippet image\n	image "${1:https://studio.botsqd.com/images/botsquad-logo.png}"\n\nsnippet buttons\n	buttons "${1:Please click one of these:}" do\n	"${2:Button 1}" ->\n		postback "${3:button1}"\n	"${4:Button 2}" ->\n		open "${5:https://www.botsquad.com}"\n	end\n\nsnippet ask\n	${1:name} = ask "${2:What is your name?}"\n\nsnippet ask_email\n	${1:email} = ask "${2:Enter your email}", expecting: :email\n\nsnippet ask_image\n	${1:image} = ask "${2:Upload an image}", expecting: :image\n\nsnippet yesno\n	${1:reply} = ask "${2:Do you like this?}", expecting: [:yes, :no]\n\nsnippet dialog\n	dialog ${1:mydialog} do\n		${2}\n	end\n\nsnippet dtrigger\n	dialog trigger: "${1:hello|welcome|hi}" do\n		say "${2:Hello there to you too!}"\n	end\n\nsnippet dpostback\n	dialog postback: "${1:button1}" do\n		say "${2:You pressed a button!}"\n	end\n\nsnippet unknown\n	dialog __unknown__ do\n		${1}\n	end\n\nsnippet ifyesno\n	if ${1:reply == :yes} do\n		say "${2:You said yes}"\n	end\n\nsnippet if\n	if ${1:condition} do\n		${2}\n	end\n\nsnippet ifelse\n	if ${1:condition} do\n		${2}\n	else\n		${3}\n	end\n\nsnippet else\n	else ${1:condition}\n		${2}\n	end\n\nsnippet branch\n	branch do\n	${1:condition} ->\n		${2}\n	${3:condition} ->\n		${4}\n	end\n\nsnippet random\n	random do\n		say "${1:First thing}"\n		say "${2:Another thing}"\n	end\n\nsnippet repeat\n	repeat ${1:count} in ${2:[5, 4, 3, 2, 1]} do\n		say "${3:Counting down... #{count}}"\n	end\n\nsnippet inv\n	invoke ${1:mydialog}\n',t.scope="botsi"})