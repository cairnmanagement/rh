import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    //accueil de l'application
    component: Home,
    children: [
      {
        path: '/personnel/new',
        name: 'PersonnelNew',
        //accueil de l'application
        component: () => import ('../views/PersonnelEdit.vue') 
      },
    ]
  },
  
  {
    path: '/personnel/:id',
    name: 'Personnel',
    component: () => import(/* webpackChunkName: "about" */ '../views/Element.vue'),
    children: [
      {
        path: 'properties',
        component: () => import('../views/ElementProperties.vue')
      },
      {
        path: 'informations',
        component: () => import('../views/ElementInformations.vue')
      },
      {
        path: '/personnel/:id/edit',
        name: 'ModificationEtatCivil',
        //Formulaire de modification de l'état-civil 
        //du personnel passé par ID
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/PersonnelEdit.vue')
      },
      {
        path: '/personnel/:id/phone/:idPhone/edit',
        name: 'ressourcePhone',
        //'Édition d\'une ressource. si id ressource =0, création d\'une nouvelle ressource',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/EditPhone.vue')
      },
      {
        path: '/personnel/:id/mail/:idMail/edit',
        name: 'ressourceMail',
        //'Édition d\'une ressource. si id ressource =0, création d\'une nouvelle ressource',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/EditMail.vue')
      },
      {
        path: '/personnel/:id/adress/:idAdress/edit',
        name: 'ressourceAddress',
        //'Édition d\'une ressource. si id ressource =0, création d\'une nouvelle ressource',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/EditAddress.vue')
      },
      {
        path: '/personnel/:id/contrat/:idContrat',
        name: 'infoContrat',
        component: () => import('../views/ContractConsult.vue')
        
      },
      {
        path: '/personnel/:id/contrat/:idContrat/edit',
        name: 'EditContrat',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ContractEdit.vue')
      },
      {
        path: 'contrat/:idContrat/delete',
        name: 'DeleteContrat',
        component: () => import('../views/ContractDelete.vue')
      },



      {
        path: 'contrat/:idContrat/avenant',
        name: 'Avenant',
        component: () => import('../views/ContractDelete.vue')
      },
      {
        path: 'contrat/0/avenant/:idContrat',
        name: 'NewAvenant',
        component: () => import('../views/ContractEdit.vue')
      }
      
    ]
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
    path: '/parametre',
    name: 'Parametre',
    component: () => import('../views/Parametre.vue'),
  },
  {
    path: '/parametre/contrat-type',
    name: 'ContratType',
    component: () => import('../views/parametre/ParametreConsult.vue'),
  },
  {
    path: '/parametre/contrat-qualification',
    name: 'ContratQualification',
    component: () => import('../views/parametre/ParametreConsult.vue')
  },
  {
    path: '/parametre/contrat-statut',
    name: 'ContratStatut',
    component: () => import('../views/parametre/ParametreConsult.vue')
  },
]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
  