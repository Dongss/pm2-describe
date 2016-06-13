# pm2-describe

describe pm2 processes info

## Usage

install

`npm install pm2-describe --save`

Before use pm2-describe, you must be conntected with pm2.

basic usage:

```
const pm2Desc = require('pm2-describe');                    
const pm2 = require('pm2');                            
                                                       
pm2Desc(pm2, {                                         
    interval: 2000                                     
});                                                    
                                                       
pm2.connect(err => {                                   
    if (err) {                                         
        console.log(err);                              
    }                                                  
                                                       
    pm2                                                
    .onDescribe(function(list) {                       
        console.log(list); 
    })                                                 
    .descError(function(err) {                         
        console.log('Error: ', err);       
    })                                       
    .descStart();                                
});
```

more example:

```
const pm2Desc = require('pm2-describe');
const pm2 = require('pm2');

let log = function () {
    console.log(new Date().getMinutes() + ":" + new Date().getSeconds(), arguments[0]);
};

pm2Desc(pm2, {
    interval: 2000
});

pm2.connect(err => {
    if (err) {
        log(err);
    }

    pm2
    .onDescribe(function(list) {
        log('Count Processes: '+ list.length);
    })
    .descError(function(err) {
        log('Error: '+ err);
    })
    .descStart();

    setTimeout(function() {
        log('Clear describe !');
        pm2.descClear();
    }, 4000);

    setTimeout(function() {
        log('Start it again !');
        pm2.descStart();
    }, 7000);

    setTimeout(function() {
        log('Change onDescribe callback !');
        pm2.onDescribe(function(list) {
            log('One pm id: '+ list[0].pm_id);
        });
    }, 11000);

    setTimeout(function() {
        log('Reset my interval !');
        pm2.resetDescInterval(500);
    }, 14000);

    setTimeout(function() {
        log('Clear describe !');
        pm2.descClear();
        log('The End');
    }, 17000);
});
```

output:

```
4:33 Count Processes: 5
4:35 Clear describe !
4:38 Start it again !
4:40 Count Processes: 5
4:42 Change onDescribe callback !
4:42 One pm id: 0
4:44 One pm id: 0
4:45 Reset my interval !
4:45 One pm id: 0
4:46 One pm id: 0
4:46 One pm id: 0
4:47 One pm id: 0
4:47 One pm id: 0
4:48 Clear describe !
4:48 The End

```

## Init

```
const pm2Desc = require('pm2-describe');
const pm2 = require('pm2');

pm2Desc(pm2, {     
    interval: 2000 
});                
```

* pm2: pm2 module, required
* options
 * interval: `Number`, unit `ms`, default 2000, optional

## API

Extend [API of PM2](http://pm2.keymetrics.io/docs/usage/pm2-api/#programmatic-api) :

* onDescribe(callback)
  describe callback
* descStart(interval) interval: `Number`, optional
  start describe task
* descClear()
  clear describe task
* resetDescInterval(interval) interval: `Number`, required 
  change interval and restart task
* descError(callback)
  errors

## Outputs

`onDescribe` callback list should like this:

```
[ { pid: 13418,
    name: 'pm2-dog-server',
    pm2_env: 
     { name: 'pm2-dog-server',
       vizion: true,
       autorestart: true,
       exec_mode: 'fork_mode',
       exec_interpreter: 'node',
       pm_exec_path: '/data/home/dongshaoshuai/js/pm2-dog-server/index.js',
       env: [Object],
       pm_cwd: '/data/home/dongshaoshuai/js/pm2-dog-server',
       instances: 1,
       node_args: [],
       pm_out_log_path: '/data/home/dongshaoshuai/.pm2/logs/pm2-dog-server-out-0.log',
       pm_err_log_path: '/data/home/dongshaoshuai/.pm2/logs/pm2-dog-server-error-0.log',
       pm_pid_path: '/data/home/dongshaoshuai/.pm2/pids/pm2-dog-server-0.pid',
       NODE_APP_INSTANCE: 0,
       MANPATH: '/data/home/dongshaoshuai/.nvm/versions/node/v6.0.0/share/man:/usr/local/share/man:/usr/share/man/en:/usr/share/man',
       HOSTNAME: 'spt_dev',
       TERM: 'xterm',
       SHELL: '/bin/bash',
       HISTSIZE: '1000',
       SSH_CLIENT: '192.168.191.111 58797 22',
       NVM_PATH: '/data/home/dongshaoshuai/.nvm/versions/node/v6.0.0/lib/node',
       SSH_TTY: '/dev/pts/4',
       NVM_DIR: '/data/home/dongshaoshuai/.nvm',
       USER: 'dongshaoshuai',
       LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.tbz=01;31:*.tbz2=01;31:*.bz=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=01;36:*.au=01;36:*.flac=01;36:*.mid=01;36:*.midi=01;36:*.mka=01;36:*.mp3=01;36:*.mpc=01;36:*.ogg=01;36:*.ra=01;36:*.wav=01;36:*.axa=01;36:*.oga=01;36:*.spx=01;36:*.xspf=01;36:',
       REGION_ID: '1',
       MAIL: '/var/spool/mail/dongshaoshuai',
       PATH: '/data/home/dongshaoshuai/.nvm/versions/node/v6.0.0/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/data/home/dongshaoshuai/bin:/data/home/dongshaoshuai/usr/local/mongodb/mongodb-linux-x86_64-3.0.6/bin',
       NVM_NODEJS_ORG_MIRROR: 'https://nodejs.org/dist',
       PWD: '/data/home/dongshaoshuai/js/pm2-dog-admin',
       LANG: 'en_US.UTF-8',
       NODE_ENV: 'local',
       HISTCONTROL: 'ignoredups',
       SHLVL: '1',
       HOME: '/data/home/dongshaoshuai',
       LOGNAME: 'dongshaoshuai',
       SSH_CONNECTION: '192.168.111.111 58797 192.168.111.111 22',
       NVM_BIN: '/data/home/dongshaoshuai/.nvm/versions/node/v6.0.0/bin',
       LESSOPEN: '||/usr/bin/lesspipe.sh %s',
       NVM_IOJS_ORG_MIRROR: 'https://iojs.org/dist',
       G_BROKEN_FILENAMES: '1',
       _: '/usr/bin/pm2',
       OLDPWD: '/data/home/dongshaoshuai',
       status: 'online',
       pm_uptime: 1465370136831,
       axm_actions: [],
       axm_monitor: {},
       axm_options: {},
       axm_dynamic: {},
       vizion_running: false,
       created_at: 1465370136831,
       pm_id: 0,
       restart_time: 31,
       unstable_restarts: 0,
       started_inside: false,
       command: [Object],
       versioning: null,
       exit_code: 8 },
    pm_id: 0,
    monit: { memory: 37703680, cpu: 0 } }]
```
