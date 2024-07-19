let audio = new Audio();
var request = new XMLHttpRequest();
var count = 0;
function Main(){
    
    return{
        DiscordGuildId: '979112778876989500', // Discord server ID
        DiscordInviteLink: 'https://discord.gg/NWHuB56Evy',
        musicAutoplay: true, // if the music should automaticly start.
        musicVolume: 0.1, // Set the volume that you like (0 = 0% ; 0.5 = 50% ; 1 = 100%)
        buttons:[
            {label: 'Home', selected: true},
            {label: 'News', selected: false},
            {label: 'Team', selected: false},
        ],
        musicList: [
            {label: 'Ballatha Jathi',author: 'BABY JEAN, Dabzee, and NJ',src: 'audio/Ballaatha Jaathi.mp3'},
            {label: 'Aasa Kooda',author: 'Sai Abhyankkar and Sai Smriti',src: 'audio/Asa.mp3'},
        ],
        
        // No touching here!!!!
        isMusicPlaying: false,
        musicOpen: false,
        currentSong: 0,
        listen(){
            if(this.musicAutoplay){
                setTimeout(() => { this.play();}, 100);
            }
            request.open('GET', 'https://discordapp.com/api/guilds/'+this.DiscordGuildId+'/widget.json', true);
            request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                count = data.presence_count;
            }
            };    
            request.onerror = function() {
            };
            request.send();   
            setTimeout(() => { this.memberCount = count; }, 1000);
        },
        selectBtn(select){
            this.buttons.forEach(function(button){
                button.selected = false;
            });
            return true;
        },
        play(){
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            audio.volume = this.musicVolume;
            this.isMusicPlaying = true;
        },
        pause(){
            audio.pause()
            this.isMusicPlaying = false;
        },
        next(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong < this.musicList.length-1){
                this.currentSong++;
            }else{
                this.currentSong = 0;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
        prev(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong != 0){
                this.currentSong = this.currentSong-1;
            }else{
                this.currentSong = this.musicList.length-1;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
    }
}
