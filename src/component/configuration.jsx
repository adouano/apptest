import React, { useEffect, useState } from 'react';
import supabase from "../config/dbConfig";
import { useAuth } from '../config/userContext';
import { useParams } from "react-router-dom";
import {Form, Stack, Button} from 'react-bootstrap';

import Footer from '/src/footer';
import Header from '/src/header';
import ErrorPage from './error_page';

const Configuration = ({userprofile}) => {
    const { user } = useAuth();
    const {userId} = useParams();
    const [parametre, setParametre] = useState([]);
    const [adherent, setAdherent] = useState(null);
    const [relative, setRelative] = useState(null);
    const [bonusCcl, setBonusCcl] = useState(null);
    const [bonusFinance, setBonusFinance] = useState(null);
    const [bonusInfo, setBonusInfo] = useState(null);
    const [bonusSupervisor, setBonusSupervisor] = useState(null);
    const [bureau, setBureau] = useState(null);
    const [descripBureau, setDescripBureau] = useState(null);
    const [mlocation, setMlocation] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [version, setVersion] = useState(0);

    const handleReset = () => {
        setVersion(version + 1);
    }

    // Recuperer et afficher la ligne de configuration
    useEffect(() => {
        const parametres = async() => {
            try{
                const { data, error } = await supabase.from('configurations').select().eq('id', 1).single();

                if(error){
                    throw new Error(error.message);
                }
                setParametre(data);
            }
            catch(error){
                console.log(error.message);
            }
        }

        parametres();
    }, []);

    // Maj de la contribution de l'adherent
    const handleAdherent = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
                .from('configurations')
                .update({ montant_adherent: adherent })
                .eq('id', 1);

            if(!error){
                await supabase
                    .from('dvenrollogs')
                    .insert({
                        action:`Modification de contribution d'adhésion`,
                        note:`${user.email} a modifié le motant (${adherent}) de soucription de l'adhérent principal...`
                    });
                setAdherent(data);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

    // Maj contribution de chaque protege associe a l'adherent
    const handleRelative = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
                .from('configurations')
                .update({ montant_relative: relative })
                .eq('id', 1);

            if(!error){
                await supabase
                .from('dvenrollogs')
                .insert({
                    action:`Modification de contribution du protégé`,
                    note:`${user.email} a modifié le motant (${relative}) de soucription du protégé...`
                });
                setRelative(data);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

    // Pourcentage de bonus pour associes
    const handleBonusCommercial = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
                .from('configurations')
                .update({ bonus_commercial: bonusCcl })
                .eq('id', 1);

            if(!error){
                await supabase
                    .from('dvenrollogs')
                    .insert({
                        action:`Modification de bonus`,
                        note:`${user.email} a modifié le pourcentage (${bonusCcl}) bonus du commercial...`
                    });
                setBonusCcl(data);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    const handleBonusFinance  = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
                .from('configurations')
                .update({ bonus_finance: bonusFinance })
                .eq('id', 1);

            if(!error){
                await supabase
                    .from('dvenrollogs')
                    .insert({
                        action:`Modification de bonus`,
                        note:`${user.email} a modifié le pourcentage (${bonusFinance}) bonus du caissier/caissiere...`
                    });
                setBonusFinance(data);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    const handleBonusSupervisor = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
                .from('configurations')
                .update({ bonus_supervisor: bonusSupervisor })
                .eq('id', 1);

            if(!error){
                await supabase
                    .from('dvenrollogs')
                    .insert({
                        action:`Modification de bonus`,
                        note:`${user.email} a modifié le pourcentage (${bonusSupervisor}) bonus du superviseur...`
                    });
                setBonusSupervisor(data);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    const handleBonusInformaticien = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
                .from('configurations')
                .update({ bonus_informaticien: bonusInfo })
                .eq('id', 1);

            if(!error){
                await supabase
                    .from('dvenrollogs')
                    .insert({
                        action:`Modification de bonus`,
                        note:`${user.email} a modifié le pourcentage (${bonusInfo}) bonus de l'informaticien...`
                    });
                setBonusInfo(data);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

    // Ajout et liste de bureau de travail
    const handleBureau = async(e) => {
        e.preventDefault();
        if(bureau===undefined || bureau===null){
            setErrorMsg("La ville est obligatoire");
            return;
        }
        try{
            const { data, error } = await supabase
                .from('dvlieumission')
                .insert({ libelle: bureau, description: descripBureau})
                .select();

                // if(!error){
                //     setMlocation(data);
                // }

            if(!error){
                await supabase
                    .from('dvenrollogs')
                    .insert({
                        action:`Ajout de lieu d'enrollement`,
                        note:`${user.email} a ajouté un nouveau local (${bureau}) d'enrollement...`
                    });
                setBonusInfo(data);
                window.location.reload();
            }
        }
        catch(error){
            console.log(error.message);
        }
    }
    useEffect(() => {
        const fetchLocation = async() => {
            try{
                const { data, error } = await supabase.from('dvlieumission').select();
                
                if(!error){
                    setMlocation(data);
                }
            }
            catch(error){
                console.log(error.message);
            }
        }
        fetchLocation();
    }, []);

    const supprimBureau= async (localId,elocal) => {
        try {
          const { error } = await supabase.from('dvlieumission').delete().eq('id', localId);
    
        if(!error){
            await supabase
                .from('dvenrollogs')
                .insert({
                    action:`Suppression de centre d'enrollement`,
                    note:`${user.email} a supprimé le local (${elocal}) d'enrollement...`
                });
        }else{
            throw new Error("Impossible de supprimer...");
          }         
          setMlocation(mlocation.filter((lelocal) => lelocal.id !== localId));
        } catch (error) {
            console.log("Deleting error :", error);
            //   console.log(error.message);
        }
    };
    
    return (
        <>
        <Header />
            <div className='content p-5'>
                <h1 className='mb-5'>Configuration</h1>
                    {user?.id===userId ? (
                    <>
                        <h3 className=''>Montant Adherent <span className="" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Somme d'argent que devra payer l'adherent principal."> &#9432;</span></h3>
                        <Stack direction="horizontal" gap={3} className='pb-5'>
                            <Form.Control className="me-auto" name='mtadherent' defaultValue={parametre.montant_adherent} onChange={(e) => setAdherent(e.target.value)} placeholder="Somme a payer pour l'adherent principal..." />
                            <Button variant="secondary" onClick={handleAdherent}>Enregistrer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>
                        </Stack>
                        
                            <div className="tooltip">&#9432;
                                <span className="tooltiptext">Somme d'argent que devra payer l'adherent principal.</span>
                            </div>

                        <hr/>
                        <h3 className='mt-5'>Montant Relative <i className="bi-info-circle" aria-hidden="true" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Somme d'argent que devra payer l'adherent principal." title="Somme d'argent qui devra etre paye pour chaque protege."></i> </h3>
                        <Stack direction="horizontal" gap={3} className='pb-5'>
                            <Form.Control className="me-auto" name='mtrelative' defaultValue={parametre.montant_relative} onChange={(e) => setRelative(e.target.value)} placeholder="Somme a payer par protege ajoute..." />
                            <Button variant="secondary" onClick={handleRelative}>Enregistrer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>                        
                        </Stack>

                        <hr/>
                        <h3 className='mt-5'>Commision/Pourcentage Commercial</h3>
                        <Stack direction="horizontal" gap={3} className='pb-5'>
                            <Form.Control className="me-auto" name='bcommercial' defaultValue={parametre.bonus_commercial} onChange={(e) => setBonusCcl(e.target.value)} placeholder="Commision/Pourcentage..." />
                            <Button variant="secondary" onClick={handleBonusCommercial}>Enregistrer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>
                        </Stack>

                        <hr/>
                        <h3 className='mt-5'>Commision/Pourcentage Caissiere</h3>
                        <Stack direction="horizontal" gap={3} className='pb-5'>
                            <Form.Control className="me-auto" name='bfinance' defaultValue={parametre.bonus_finance} onChange={(e) => setBonusFinance(e.target.value)} placeholder="Commision/Pourcentage..." />
                            <Button variant="secondary" onClick={handleBonusFinance}>Enregistrer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>
                        </Stack>

                        <hr/>
                        <h3 className='mt-5'>Commision/Pourcentage Informaticien</h3>
                        <Stack direction="horizontal" gap={3} className='pb-5'>
                            <Form.Control className="me-auto" name='binfo' defaultValue={parametre.bonus_informaticien} onChange={(e) => setBonusInfo(e.target.value)} placeholder="Commision/Pourcentage..." />
                            <Button variant="secondary" onClick={handleBonusInformaticien}>Enregistrer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>
                        </Stack>

                        <hr/>
                        <h3 className='mt-5'>Commision/Pourcentage Superviseur</h3>
                        <Stack direction="horizontal" gap={3} className='pb-5'>
                            <Form.Control className="me-auto" name='bsuper' defaultValue={parametre.bonus_supervisor} onChange={(e) => setBonusSupervisor(e.target.value)} placeholder="Commision/Pourcentage..." />
                            <Button variant="secondary" onClick={handleBonusSupervisor}>Enregistrer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>
                        </Stack>

                        <hr/>
                        <h3 className='mt-5'>Ajout de location/ville</h3>
                        <Form onSubmit={handleBureau}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Bureau</Form.Label>
                                <Form.Control className="col-md-auto" name='bureau' defaultValue={bureau} onChange={(e) => setBureau(e.target.value)} autoComplete="off" placeholder="Ajout de nouveaux lieu/bureau..." />
                                {errorMsg && <p style={{color: "#FF0000"}}>{errorMsg}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={2} name='descripbureau' defaultValue={descripBureau} onChange={(e) => setDescripBureau(e.target.value)} placeholder="Breve description du lieu/bureau de mission..." />
                            </Form.Group>
                            <Stack direction="horizontal" gap={3} className='pb-5'>
                                <Button variant="secondary" onClick={handleBureau}>Enregistrer</Button>
                                <div className="vr" />
                                <Button variant="outline-danger" type="reset" defaultValue="Reset" onClick={handleReset}>Reinitialiser</Button>
                            </Stack>
                        </Form>
                        
                        <div className='row gap-2'>
                            {mlocation.map((lelocal, index) => (
                                <div className="card" style={{width: "10rem"}} key={lelocal.id}>
                                    <div className="card-body">
                                        <Stack direction="horizontal" gap={1}>
                                            <h5 className="card-title" aria-describedby="description" title={lelocal.description}>{lelocal.libelle}</h5>
                                            <button className="btn btn-danger" onClick={() => supprimBureau(lelocal.id,lelocal.libelle)}>X</button>
                                        </Stack>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </>
                ):(
                <>
                    <ErrorPage />
                </>
                )}
            </div>
        <Footer />
        </>
    )
}

export default Configuration;
