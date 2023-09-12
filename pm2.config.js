module.exports = {
    apps: {
        "name": "blog-server",                             // 项目名
        "script": "./bin/www",                      // 执行文件
        "cwd": "./",                                // 根目录
        "args": "",                                 // 传递给脚本的参数
        "interpreter": "",                          // 指定的脚本解释器
        "interpreter_args": "",                     // 传递给解释器的参数
        "watch":[
            "controller",
            "database"
        ],                              // 是否监听文件变动然后重启
        "ignore_watch": [                           // 不用监听的文件
            "node_modules",
            "logs",
            'public',
            "uploads"
        ],
        "exec_mode": "cluster_mode",                // 应用启动模式，支持fork和cluster模式
        "instances": 2,                             // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
        "max_memory_restart": 8,                    // 最大内存限制数，超出自动重启
        "error_file": "./logs/app-err.log",         // 错误日志文件
        "out_file": "./logs/app-out.log",           // 正常日志文件
        "merge_logs": true,                         // 设置追加日志而不是新建日志
        "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
        "max_restarts": 30,                         // 最大异常重启次数，即小于min_uptime运行时间重启次数；
        "autorestart": true,                        // 默认为true, 发生异常的情况下自动重启
        env: {
            NODE_ENV: "production",
            PORT: 3300
        },
        // env: {
        //     NODE_ENV: "development",
        //     PORT: 3300
        // },
        // env_test: {
        //     NODE_ENV: "test",
        // },
        // env_staging: {
        //     NODE_ENV: "staging",
        // },
        // env_production: {
        //     NODE_ENV: "production",
        //     PORT: 3300
        // }
    }

}
