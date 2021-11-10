<?php

namespace App\Jobs;

use App\Mail\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Mail;

class VerifyMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $email, $redirectUrl, $token;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, $redirectUrl, $token)
    {
        $this->email = $email;
        $this->redirectUrl = $redirectUrl;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        return Mail::to($this->email)->send(new VerifyEmail($this->redirectUrl, $this->token));
    }
}
