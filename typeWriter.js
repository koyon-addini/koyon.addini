
/*******************************************************************/
/* See README.md for more informations about the TypeWriter Object */
/*******************************************************************/

function TypeWriter(elmt) {
	this.elmt = elmt;
	this.selector = $(elmt);
	this.linesToDisplay = [
		'<center><h3><font color="lightgrey">Dasunan Allah Mai Rahama Mai Jinƙai</font></center></h3>',
		'<big><b>Dukkan Godiya Ta Tabbata Ga Allah Mai Girma da ɗaukaka Kuma Mabuwayi.</big></b>',
		'Sannan Allah Maɗaukakin Sarki yayi salati ga shugaba fiyayyen halitta mai girman daraja mai girman alfarma  mai gaskiya abin gaskatawa  Muhammadur Rasulullahi (Sallallahu Ta’aalaa Alaihi Wasallam).',
		'<font color="deeppink">Muna ƙara jaddada Godiya ga Allah (Subhanahu Wata’aalaa) Mai ƙarfin iko Mai ƙaddara ababen ƙaddarawa abisa ƙaddarawarsa da ikonsa da yabamu daman ƙirƙiran wannan (Application) ɗin na wayawar (Android.)</font>',
		'<b><font color="#ffffff">Bayan haka</b>:</font>',
		'<font color="cyan">Assalamu Alaikum Warahamatullahi Ta’aalaa Wabarakaa tuhu Ya ‘Yan Uwa Musulmai.</font>',
		'<b><font color="#F6F">Tambaya: Menene dalilin yin wannan (Application) ɗin?</b>',
		'<font color="yellow">Amsa: Munyishi ne saboda Allah da Manzonsa domin neman rahamar Allah da kuma neman yardan Allah da Manzonsa da kuma neman kusancin Allah da Manzonsa (Sallahu Ta’ala Alaihi Wasallam), Kuma Munyishi ne ba don neman yabo ba, kuma ba don neman wata buƙata ta duniya ba, kuma munyishi ne saboda yara da manya maza da mata domin ilimantarwa da kuma samun sauqin iya karatun addini in Allah ya yarda.',
		'<font color="#ffffff">Abinda muke nema agareku.</font>',
		'Shine ga duk wanda Allah yasa wannan (Application) ɗin ya iso zuwa gareshi ko zuwagareta shine a aika wannan (Application) ɗin ga yan uwa Musulamai gwargwadon iko don Allah domin shima yasamu ladar aikawa gawanda yayi aiki dashi, Saboda hadisin Manzo Allah (Sallaahu Alaihi Wasallam) Yace: <font color="#ffffff">“Duk wanda yayi nuni ga alkhairi to yanada lada kwatankwacin wanda ya aikatashi.”</font> <font color="deeppink">[Muslim ne ya ruwaitoshi]</font>',
		'<font color="lightgrey">Allah yasa ka da alkhairi</font>.',
		'<b><font color="#F6F">Addu’armu gareku.</b></font>',
		'<font color="cyan">Allah ubangiji Maɗaukakin sarki Mabuwayin sarki Mai jujjuya al’amurra Mai ƙaddara ababen ƙaddarawa ya amfãnarda duk wanda yayi amfani da wannan (Application) ɗin, Kuma ya amfãnarda wanda yakaranta ko wadda ta karanta, da wanda ya yã ɗa ko wadda tayã ɗa wannan Application zuwaga jama’a gwargwadon iyawa.  Ameen.</font>',
		'<b><font color="yellow">Bayan haka:</font></b>',
		'<font color="#F6F">Kuma munaroƙon Allah yaƙara shiryardamu ya gafartamuna zunubbanmu bakiɗaya, kuma  wanda yayi muna Addu’a ta Alkhairi, Ya Allah ka sãkamasa da alkhairi yakuma sãkawa wacce itama tayimuna Addu’a ta Alkhairi da alkhairi mai yawa ameen.</font>',
		'<font color="red">Alhamdulillah.</font>',
		'<font color="cyan">Allaahumma Salli Alaa Nabiyyanaa Muhammadu Salawaatullaahi Wasalaamuhu Alaihi.</font>',
		'<font color="yellow">Alhamdulillah...</font>',
		'Alhamdulillah',
		'<font color="#fffff">Alhamdulillah.....</font>'
	];
	this.firstDelay = 2000;
	this.typingDelay = 70;
	this.afterLineDelay = 1000;
	this.endTimeOut = 2000;
	this.endText = "Mungode...";
}

TypeWriter.prototype.typeIt = function(selector, text, n) {
	var that = this;

	if (n < (text.length)) {
		$(that.elmt + ' ' + selector).html(text.substring(0, n + 1));
		n++;
		setTimeout(function() {
			that.typeIt(selector, text, n);
		}, that.typingDelay);
	} else {
		$.event.trigger("TypeWriter:linedisplayed");
	}
};

TypeWriter.prototype.appendTypeWriterItem = function(...args) {
	switch (args.length) {
		case 0:
			this.selector.append(
				"<span class='typewriter-item'>"
			);
			break;
		case 1:
			this.selector.append(
				"<span class='typewriter-item' data-text='" + args[0] + "'>"
			);
			break;
		default:
			break;
	}
};

TypeWriter.prototype.start = function() {
	var that = this;
	var i = 0;

	that.appendTypeWriterItem(that.linesToDisplay[i]);

	setTimeout(function() {
		that.typeIt('span.typewriter-item', that.linesToDisplay[i], 0);
	}, that.firstDelay);

	$(window).on('TypeWriter:linedisplayed', function() {
		i++;

		if (i < that.linesToDisplay.length) {
			that.appendTypeWriterItem(that.linesToDisplay[i]);
			setTimeout(function() {
				that.typeIt('span.typewriter-item:last-child', that.linesToDisplay[i], 0);
			}, that.afterLineDelay);
		} else
			that.appendTypeWriterItem();

		if (i === that.linesToDisplay.length)
			$.event.trigger("TypeWriter:finished");
	});

	$(window).on('TypeWriter:finished', function() {
		$(window).on('keypress', function(e) {
			if (e.keyCode == 13) {
				$(that.elmt).append("<span id='init'>" + that.endText);
				setTimeout(function() {
					$(that.elmt).fadeOut("slow");
				}, that.endTimeOut);
			}
		});
	});
};
