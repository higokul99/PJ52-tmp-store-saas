<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->string('subdomain')->nullable()->after('slug');
        });

        // Back-fill subdomain from slug for existing records
        DB::table('stores')->whereNull('subdomain')->get()->each(function ($store) {
            DB::table('stores')->where('id', $store->id)->update(['subdomain' => $store->slug]);
        });
    }

    public function down(): void
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->dropColumn('subdomain');
        });
    }
};
