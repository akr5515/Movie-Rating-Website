<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;
    public  $redirectUrl, $token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($redirectUrl, $token)
    {
        $this->redirectUrl = $redirectUrl;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.verify-email');
    }
}
