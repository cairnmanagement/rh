import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    //accueil de l'application
    component: Home
  },
  /**
   * routes de l'application selon fiche  spec
   */
  // {
  //   path: '/personnel/:id',
  //   name: 'FichePersonnel',
  //   //fiche du personnel passé par ID
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/:id/edit',
  //   name: 'ModificationEtatCivil',
  //   //Formulaire de modification de l'état-civil 
  //   //du personnel passé par ID
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/:id/phone/:idPhone/edit',
  //   name: 'ressourcePhone',
  //   //'Édition d\'une ressource. si id ressource =0, création d\'une nouvelle ressource',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/:id/mail/:idMail/edit',
  //   name: 'ressourceMail',
  //   //'Édition d\'une ressource. si id ressource =0, création d\'une nouvelle ressource',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/:id/adress/:idAdress/edit',
  //   name: 'ressourceAdress',
  //   //'Édition d\'une ressource. si id ressource =0, création d\'une nouvelle ressource',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/:id/contrat/:idContrat',
  //   name: 'infoContrat',
  //   //Affichage des informations d’un contrat dans une boite modale au-dessus de la fiche personnel.
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/:id/contrat/:idContrat/edit',
  //   name: 'formContrat',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },
  // {
  //   path: '/personnel/extract',
  //   name: 'configList',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/.vue')
  // },



  {
    path: '/personnel-actif',
    name: 'PersonnelActif',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonnelActif.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contacts.vue')
  },
  {
    path: '/tous',
    name: 'Contrats',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/All.vue')
  },
  {
    path: '/docs-complements/:id',
    name: 'DocsComplements',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DocsComplements.vue')
  },
  {
    path: '/a-propos',
    name: 'A-propos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/A-propos.vue')
  },
  {
    path: '/element/:id',
    name: 'Element',
    component: () => import(/* webpackChunkName: "about" */ '../views/Element.vue'),
    children: [
      {
        path: 'properties',
        component: () => import('../views/ElementProperties.vue')
      },
      {
        path: 'informations',
        component: () => import('../views/ElementInformations.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
