﻿using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Classes
{
    public class Chat : Hub
    {
        public async Task Send(string nick, string message)
        {
            //await Clients.All.InvokeAsync("Send", nick, message);
            await Clients.All.SendAsync("Send", nick, message);
        }
    }
}
