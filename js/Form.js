(function($){
	function init(form,o){
		var name=$('.name>input',form)
			,email=$('.email>input',form)
			,submit=$('a[data-type="submit"]',form)
			,msg_success=$('.success',form).hide()
			,bl,vl
			
		o=$.extend({
			ownerEmail:'#'
			,mailHandlerURL:'bat/MailHandler-sub.php'
		},o)
		
		submit.click(function(){
			vl=true
			name.add(email).trigger('keyup')
			if(!$('.invalid',form).length)
				sendRQ()
			return false
		})
				
		form[form.on?'on':'bind']('keyup',function(e){
			if(e.keyCode===13){
				name.add(email).data({wtch:true}).trigger('keyup')
				if(!$('.invalid',form).length){					
					sendRQ()
					return false
				}else{
					$('.invalid',form).focus()
				}
			}
		})
		
		name.add(email)
			.data({wtch:true})
			.each(function(){
				var th=$(this)
					,val=th.val()
				th
					.data({defVal:val})
					.focus(function(){
						if(th.val()==val)
							th.val('')
							,th.parents('label').removeClass('invalid')
							,th.data({wtch:false})
					})
					.blur(function(){
						if(th.val()=='')
							th.val(val)							
							//,th.parents('label').removeClass('invalid')
						//else
							th.data({wtch:true}).trigger('keyup')
					})
			})
			[name.on?'on':'bind']('keyup',function(e){
				var th=$(this)
				if(th.data('wtch'))
					th.parents('label')[validate(th)?'removeClass':'addClass']('invalid')
			})
	
		function validate(el){
			var rx={
					"text":/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/
					,"email":/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
				}
				,val=el.val()
			return rx[el.attr('type')].test(val)&&val!==el.data('defVal')
		}
		
		function sendRQ(){
			if(bl)
				return false
			bl=true
			$.ajax({
				type:"POST"
				,url:o.mailHandlerURL
				,data:{
					name:name.length?name.val():email.val().split('@')[0]
					,email:email.val()
					,owner_email:o.ownerEmail					
					,sitename:o.sitename||o.ownerEmail.split('@')[1]
				}
				,success:function(e){
					bl=false
					msg_success
						.slideDown(400,function(){
							submit.focus()
							form.trigger('reset')							
							name.add(email).data({wtch:true})
							setTimeout(function(){
								msg_success.fadeOut(400)
							},1000)
						})					
				}
			})
		}		
	}	

	$.fn.sForm=function(o){
		return this.each(function(){
			init($(this),o)
		})
	}
	
})(jQuery)
$(window).load(function(){
	$('#form1').sForm({			
		ownerEmail:'#'
		,sitename:'sitename.link'
	})
})


/*document.getElementById("formulaire").addEventListener("submit", function (e) {
	e.preventDefault();
  
	var nom = document.getElementById("nom");
	var prenom = document.getElementById("prenom");
	var p_sexe = document.getElementById("p_sexe");
	var sexe_F = document.getElementById("sexe_F");
	var sexe_M = document.getElementById("sexe_M");
	var ddn = document.getElementById("ddn");
	var cp = document.getElementById("cp");
	var adresse = document.getElementById("adresse");
	var ville = document.getElementById("ville");
	var Email = document.getElementById("Email");
	var sujet = document.getElementById("sujet");
	var question = document.getElementById("question");
	var checkbox = document.getElementById("checkbox"); 
	
   
	//  Nom
  
	if (nom.value === "") {
	  nom.innerHTML = "Veuillez entrer votre nom";
	  nom.style.color = "red";
	  console.log("Erreur nom");
	} else if (!/^[a-zA-Z -'éèçùïëä]+$/.test(nom.value)) {
	  nom.innerHTML = "Nom incorrect";
	  nom.style.color = "red";
	  console.log("Erreur nom");
	} else {
	  nom.innerHTML = "Nom OK";
	  nom.style.color = "green";
	} 
	
	
	//  Prenom
  
	if (prenom.value === "") {
	  prenom.innerHTML = "Veuillez entrer votre prenom";
	  prenom.style.color = "red";
	  console.log("Erreur prenom");
	} else if (!/^[a-zA-Z -'éèçùïëä]+$/.test(prenom.value)) {
	  prenom.innerHTML = "Prenom incorrect";
	  prenom.style.color = "red";
	  console.log("Erreur prenom");
	} else {
	  prenom.innerHTML = "Prenom OK";
	  prenom.style.color = "green";  
	}
	
	//  Sexe
  
  
	if (sexe_F.checked || sexe_M.checked) {
	  document.getElementById("p_sexe").innerHTML = "Sexe OK";
	  p_sexe.style.color = "green";
	} else {
	  document.getElementById("sexe_F || sexe_M").innerHTML = "Veuillez cocher la case correspondant à votre sexe";
	  p_sexe.style.color = "red";
	  console.log("Erreur sexe");
	}
  
	
	//  Date de Naissance
  
	if (ddn.value === "") {
	  ddn.innerHTML = "Veuillez entrer votre date de naissance";
	  ddn.style.color = "red";
	  console.log("Erreur date");
	} else if (!/^(19[0-9][0-9]|200[0-9]|201[0-9]|202[012])-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/.test(ddn.value)) {
	  ddn.innerHTML = "Date incorrecte";
	  ddn.style.color = "red";
	  console.log("Erreur date");
	} else {
	  ddn.innerHTML = "Date OK";
	  ddn.style.color = "green";
	} 
	
  
	// Code Postal
  
	if (cp.value === "") {
	  cp.innerHTML = "Veuillez entrer votre code postal";
	  cp.style.color = "red";
	  console.log("Erreur code postal");
	} else if (!/^[\d]{5}$/.test(cp.value)) {
	  cp.innerHTML = "Code postal incorrect";
	  cp.style.color = "red";
	  console.log("Erreur code postal");
	} else {
	  cp.innerHTML = "Code postal OK";
	  cp.style.color = "green";
	} 
  
	
	// Adresse
  
	if (adresse.value === "") {
	  adresse.innerHTML = "Veuillez renseigner votre adresse";
	  adresse.style.color = "red";
	  console.log("Erreur adresse");
	} else if (!/^[\S ]+$/.test(adresse.value)) {
	  adresse.innerHTML = "Adresse incorrecte";
	  adresse.style.color = "red";
	  console.log("Erreur adresse");
	} else {
	  adresse.innerHTML = "Adresse OK";
	  adresse.style.color = "green";
	}
	
  
   // Ville
  
	if (ville.value === "") {
	  ville.innerHTML = "Veuillez renseigner votre ville";
	  ville.style.color = "red";
	  console.log("Erreur ville");
	} else if (!/^[\D]+$/.test(ville.value)) {
	  ville.innerHTML = "Ville incorrecte";
	  ville.style.color = "red";
	  console.log("Erreur ville");
	} else {
	  ville.innerHTML = "Ville OK";
	  ville.style.color = "green";
	}
	
  
	// Email
  
	if (Email.value === "") {
	  Email.innerHTML = "Veuillez renseigner votre Email";
	  Email.style.color = "red";
	  console.log("Erreur email");
	} else if (!/^[a-z0-9_.-]+[a-z0-9]+@[a-z0-9_.-]+[a-z0-9]+[\.][a-z]{2,4}$/.test(Email.value)) {
	  Email.innerHTML = "Email incorrecte";
	  Email.style.color = "red";
	  console.log("Erreur Email");
	} else {
	  Email.innerHTML = "Adresse OK";
	  Email.style.color = "green";
	} 
  
	
	//  Sujet
  
	var verif_sujet = sujet.selectIndex;
  
	if (verif_sujet !== 0) {
	  sujet.innerHTML = "Sujet OK";
	  sujet.style.color = "green";
	} else {
	  sujet.innerHTML = "Veuillez sélectionner un sujet";
	  sujet.style.color = "red";
	  e.preventDefault();
	  console.log("Erreur sujet");
	} 
	
  
	//  Question
  
	var verif_question = checkbox.checked;
  
	if (verif_question === "") {
	  question.innerHTML = "Veuillez écrire votre question";
	  question.style.color = "red";
	  e.preventDefault();
	  console.log("Erreur question");
	} else {
	  var filtre_question = new RegExp("^\\S+$");
	  var res_question = filtre_question.test(verif_question);
  
	  if (res_question === false) {
		question.innerHTML = "Question incorrecte";
		question.style.color = "red";
		e.preventDefault();
		console.log("Erreur question");
	  }
  
	  if (res_question === true) {
		question.innerHTML = "Question OK";
		question.style.color = "green";
	  }
	}
	
	
	//  Checkbox
  
	var verif_checkbox = checkbox.checked;
	console.log("verif_checkbox: " + verif_checkbox);
  
	if (verif_checkbox === true) {
	  checkbox.innerHTML = "Checkbox OK";
	  checkbox.style.color = "green";
	} else {
	  checkbox.innerHTML = "Veuillez cocher cette case";
	  checkbox.style.color = "red";
	  e.preventDefault();
	  console.log("Erreur checkbox");
	}
  })*/