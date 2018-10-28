<template>
    <div>
        <div id="app">
            <div class="wrapper">
                <div class="header">
                    ¯\_(ツ)_/¯
                </div>
                <div id="nav">
                    <router-link to="/">Home</router-link> |
                    <router-link to="/about">About</router-link>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <router-view/>
        </div>
    </div>
</template>
