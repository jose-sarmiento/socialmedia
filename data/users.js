const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const baseUrl = "http://localhost:8000"

const users = [
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Cathleen Hansen",
		"phone": "(888) 743-6383",
		"email": "nisl.elementum@yahoo.com",
		"address": "2557 Nibh Rd.",
		"sex": "male",
		"bio": "pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2",
		"profileImage": `${baseUrl  }/cathleen.jpg`,
		"coverImage": `${baseUrl  }/cathleen-cover.jpg`
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Camden Hines",
		"phone": "(452) 752-4584",
		"email": "vitae.posuere@icloud.edu",
		"address": "Ap #368-9627 Metus Rd.",
		"sex": "male",
		"bio": "ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3",
		"profileImage": `${baseUrl  }/camden.jpg`,
		"coverImage": `${baseUrl  }/camden-cover.jpg`
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Brian Lawrence",
		"phone": "1-922-637-6361",
		"email": "rhoncus.donec@hotmail.edu",
		"address": "728-7376 Accumsan Rd.",
		"sex": "female",
		"bio": "urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4",
		"profileImage": `${baseUrl  }/brian.jpg`,
		"coverImage": `${baseUrl  }/brian-cover.jpg`
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Kirsten Wong",
		"phone": "1-775-362-4522",
		"email": "ut@aol.net",
		"address": "766 Sit Road",
		"sex": "male",
		"bio": "sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1",
		"profileImage": `${baseUrl  }/kirsten.jpg`,
		"coverImage": `${baseUrl  }/kirsten-cover.jpg`
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Evan Alvarez",
		"phone": "1-494-895-3904",
		"email": "dignissim.tempor.arcu@protonmail.couk",
		"address": "586-6303 Id, St.",
		"sex": "female",
		"bio": "Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio sagittis semper. Nam tempor diam dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris, rhoncus id, mollis nec,",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2",
		"profileImage": `${baseUrl  }/evan.jpg`,
		"coverImage": `${baseUrl  }/evan-cover.jpg`
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Jenette Hawkins",
		"phone": "(419) 323-9261",
		"email": "sem@google.net",
		"address": "142-5443 Odio. Street",
		"sex": "female",
		"bio": "Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Kenyon Warren",
		"phone": "(265) 286-1622",
		"email": "porttitor.tellus@protonmail.edu",
		"address": "3430 Sollicitudin St.",
		"sex": "male",
		"bio": "non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Randall Hodges",
		"phone": "(528) 751-9913",
		"email": "duis.risus.odio@aol.edu",
		"address": "440 Hendrerit Street",
		"sex": "male",
		"bio": "tristique senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Brielle Delgado",
		"phone": "1-201-555-8324",
		"email": "velit.cras@yahoo.couk",
		"address": "Ap #750-3165 Nascetur Road",
		"sex": "female",
		"bio": "in, tempus eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Hiram Schultz",
		"phone": "1-243-381-7031",
		"email": "mauris.sagittis@aol.couk",
		"address": "Ap #410-1248 Dictum Rd.",
		"sex": "male",
		"bio": "Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Grady Rivers",
		"phone": "(563) 296-1413",
		"email": "tristique.senectus@yahoo.net",
		"address": "Ap #798-1842 Dignissim. Rd.",
		"sex": "female",
		"bio": "In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Yardley Mcguire",
		"phone": "1-330-777-5167",
		"email": "duis.cursus@aol.org",
		"address": "Ap #580-9689 In St.",
		"sex": "male",
		"bio": "nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Nelle Calderon",
		"phone": "1-271-647-6514",
		"email": "rutrum.fusce@yahoo.net",
		"address": "5985 Sed Road",
		"sex": "male",
		"bio": "amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat dolor vitae dolor. Donec fringilla.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Haley Zamora",
		"phone": "(578) 853-2867",
		"email": "malesuada.integer@hotmail.ca",
		"address": "Ap #488-7141 Phasellus Street",
		"sex": "male",
		"bio": "habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Charlotte Potter",
		"phone": "1-225-227-3891",
		"email": "vitae.purus@google.edu",
		"address": "482-7847 Sed Avenue",
		"sex": "female",
		"bio": "eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Uma Mercado",
		"phone": "(441) 518-9938",
		"email": "dolor.dolor@protonmail.net",
		"address": "Ap #982-610 Massa. Street",
		"sex": "female",
		"bio": "neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Valentine Dillard",
		"phone": "1-475-331-6098",
		"email": "a.scelerisque@hotmail.com",
		"address": "Ap #309-2803 Et Rd.",
		"sex": "female",
		"bio": "purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Thomas Mcneil",
		"phone": "(619) 797-1541",
		"email": "imperdiet.nec@icloud.com",
		"address": "Ap #850-4616 Mollis. St.",
		"sex": "female",
		"bio": "scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Ethan Bentley",
		"phone": "(135) 653-6834",
		"email": "ultrices@aol.com",
		"address": "800-5898 Vitae Road",
		"sex": "female",
		"bio": "semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Ila Burt",
		"phone": "1-487-565-7249",
		"email": "tincidunt@icloud.edu",
		"address": "1812 Aliquam St.",
		"sex": "female",
		"bio": "Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Reese Cohen",
		"phone": "1-773-177-6018",
		"email": "elit@hotmail.couk",
		"address": "730-6361 Etiam Road",
		"sex": "female",
		"bio": "condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Peter Mcgowan",
		"phone": "1-368-555-5073",
		"email": "risus.duis.a@icloud.net",
		"address": "749-9392 Sit Ave",
		"sex": "female",
		"bio": "scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Cadman Dickerson",
		"phone": "(313) 407-1341",
		"email": "morbi.tristique.senectus@aol.ca",
		"address": "Ap #458-3834 Sit Road",
		"sex": "male",
		"bio": "nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a,",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Summer Mayo",
		"phone": "(681) 659-6983",
		"email": "porttitor@icloud.com",
		"address": "P.O. Box 110, 2406 Ipsum. Avenue",
		"sex": "male",
		"bio": "commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Kevin Pierce",
		"phone": "(564) 324-1259",
		"email": "phasellus.fermentum.convallis@icloud.ca",
		"address": "4834 Et St.",
		"sex": "female",
		"bio": "diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Ferris Rodgers",
		"phone": "(588) 732-4424",
		"email": "scelerisque.dui@icloud.com",
		"address": "6405 Mollis Street",
		"sex": "male",
		"bio": "molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec,",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Quynn Mcpherson",
		"phone": "1-474-648-8826",
		"email": "dignissim.tempor@hotmail.ca",
		"address": "741-8800 Curabitur Ave",
		"sex": "male",
		"bio": "orci luctus et ultrices posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Molly Cummings",
		"phone": "1-811-452-2578",
		"email": "facilisis.vitae.orci@icloud.org",
		"address": "483-170 Fermentum Av.",
		"sex": "male",
		"bio": "ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Gwendolyn Kirk",
		"phone": "1-431-777-4411",
		"email": "nunc@outlook.org",
		"address": "368-1598 Semper Rd.",
		"sex": "female",
		"bio": "dui quis accumsan convallis, ante lectus convallis est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Clarke Vaughn",
		"phone": "1-640-284-5364",
		"email": "erat.eget@yahoo.net",
		"address": "5306 Lectus Street",
		"sex": "female",
		"bio": "blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Alan Tyson",
		"phone": "1-476-761-5137",
		"email": "odio@protonmail.edu",
		"address": "499 Semper St.",
		"sex": "male",
		"bio": "erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Brenda Sandoval",
		"phone": "1-869-726-2482",
		"email": "aliquam.tincidunt@icloud.com",
		"address": "665-3345 Luctus St.",
		"sex": "female",
		"bio": "rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero. Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Preston Murphy",
		"phone": "(914) 765-2466",
		"email": "in.tempus@protonmail.edu",
		"address": "P.O. Box 877, 7095 Vitae St.",
		"sex": "male",
		"bio": "litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Madeline Gardner",
		"phone": "1-224-326-6319",
		"email": "malesuada.fames.ac@outlook.couk",
		"address": "Ap #703-4371 Etiam Ave",
		"sex": "female",
		"bio": "in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Carter Whitney",
		"phone": "(495) 858-3173",
		"email": "amet.risus@protonmail.couk",
		"address": "Ap #398-4108 Cras St.",
		"sex": "male",
		"bio": "ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Leigh Brewer",
		"phone": "(583) 924-1278",
		"email": "tincidunt.vehicula@icloud.net",
		"address": "Ap #152-4202 Et Avenue",
		"sex": "female",
		"bio": "mollis non, cursus non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam consequat",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Kim Faulkner",
		"phone": "1-717-563-7570",
		"email": "metus.urna@yahoo.net",
		"address": "728-9067 Tempus Avenue",
		"sex": "male",
		"bio": "tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Germane Christian",
		"phone": "(169) 160-3718",
		"email": "quis.tristique.ac@icloud.couk",
		"address": "5844 Egestas St.",
		"sex": "female",
		"bio": "nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Harding Huber",
		"phone": "(281) 313-6882",
		"email": "elit.elit@aol.ca",
		"address": "Ap #421-152 Feugiat. Road",
		"sex": "male",
		"bio": "sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Breanna Craft",
		"phone": "(748) 473-2457",
		"email": "nunc.est@outlook.couk",
		"address": "P.O. Box 311, 655 Nisi St.",
		"sex": "male",
		"bio": "Nulla eget metus eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Mona Hull",
		"phone": "1-569-469-5162",
		"email": "ultrices@yahoo.org",
		"address": "462-1083 In Street",
		"sex": "female",
		"bio": "ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Price Schroeder",
		"phone": "1-398-731-3365",
		"email": "dolor.elit.pellentesque@protonmail.com",
		"address": "Ap #723-9399 Velit. Road",
		"sex": "female",
		"bio": "erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Allen Hewitt",
		"phone": "1-565-737-4184",
		"email": "pretium@aol.net",
		"address": "P.O. Box 427, 8910 Eget St.",
		"sex": "male",
		"bio": "lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam",
		"password": bcrypt.hashSync('123456', 10),
		"status": "1"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Prescott Decker",
		"phone": "1-844-425-7882",
		"email": "nec.quam.curabitur@yahoo.couk",
		"address": "Ap #216-6570 Nam Street",
		"sex": "male",
		"bio": "lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus urna convallis erat, eget",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Veda Smith",
		"phone": "1-476-723-4765",
		"email": "urna.nec.luctus@hotmail.com",
		"address": "Ap #988-4386 Orci, St.",
		"sex": "male",
		"bio": "Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Audrey Mcgowan",
		"phone": "(165) 621-2561",
		"email": "et.magnis@aol.couk",
		"address": "Ap #777-3244 Interdum St.",
		"sex": "female",
		"bio": "semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Adara Jennings",
		"phone": "1-331-745-1763",
		"email": "nec.euismod@protonmail.couk",
		"address": "200-6081 Sit Rd.",
		"sex": "female",
		"bio": "tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu",
		"password": bcrypt.hashSync('123456', 10),
		"status": "3"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Logan Rowe",
		"phone": "1-741-758-1816",
		"email": "congue.elit@protonmail.ca",
		"address": "P.O. Box 199, 2657 Proin Rd.",
		"sex": "male",
		"bio": "risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas",
		"password": bcrypt.hashSync('123456', 10),
		"status": "2"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Bo Hansen",
		"phone": "(288) 323-4838",
		"email": "eu.tellus@outlook.net",
		"address": "Ap #342-6930 Integer Road",
		"sex": "female",
		"bio": "ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat neque non",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	},
	{
		_id: mongoose.Types.ObjectId(),
		"name": "Lydia Robles",
		"phone": "(810) 525-1883",
		"email": "pulvinar.arcu.et@outlook.couk",
		"address": "243-9337 Ultrices Street",
		"sex": "male",
		"bio": "nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus.",
		"password": bcrypt.hashSync('123456', 10),
		"status": "4"
	}
];

module.exports = users